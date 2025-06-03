using PaperVerse.Application.DTO_s;
using PaperVerse.Application.Interfaces;
using PaperVerse.Core.Entities;
using PaperVerse.Core.Interfaces;
using System.Security.Claims;

namespace PaperVerse.Application.UseCases.Authentication
{
    public class AccountManagementUseCase : IAccountService
    {
        private readonly IUserRepository _userRepository;
        private readonly IRefreshTokenRepository _refreshRepo;
        private readonly IAuthenticationService _authService;
        private readonly IUnitOfWork _unitOfWork;

        public AccountManagementUseCase(
            IUserRepository userRepository,
            IRefreshTokenRepository refreshRepo,
            IAuthenticationService authService,
            IUnitOfWork unitOfWork)
        {
            _userRepository = userRepository;
            _refreshRepo = refreshRepo;
            _authService = authService;
            _unitOfWork = unitOfWork;
        }
        public async Task<LoginResponse> RefreshTokenAsync(string refreshToken)
        {
            var existing = await _refreshRepo.GetByTokenAsync(refreshToken);
            if (existing == null || existing.IsExpired())
                throw new ApplicationException("Invalid refresh token.");

            var user = await _userRepository.GetByIdAsync(existing.UserId);
            if (user == null)
                throw new ApplicationException("User not found.");

            var newJwt = _authService.GenerateJwtToken(user);
            var newRefresh = Guid.NewGuid().ToString("N");
            var newExpires = DateTime.UtcNow.AddDays(7);

            existing.Revoke();
            var newEntity = new RefreshToken(user.Id, newRefresh, newExpires);
            await _refreshRepo.AddAsync(newEntity);
            await _unitOfWork.SaveChangesAsync();

            return new LoginResponse
            {
                AccessToken = newJwt,
                RefreshToken = newRefresh,
                ExpiresAt = DateTime.UtcNow.AddMinutes(_authService.JwtLifespanMinutes),
                Role = user.Role.ToString(),
                UserName = user.UserName
            };
        }

        public async Task<UserDto> GetCurrentUserAsync(ClaimsPrincipal principal)
        {
            var idClaim = principal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(idClaim, out var userId))
                throw new ApplicationException("Invalid user ID in token.");

            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                throw new ApplicationException("User not found.");

            return new UserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                UserName = user.UserName,
                Email = user.Email.Value,
                Role = user.Role.ToString()
            };
        }
        public async Task ChangePasswordAsync(ChangePasswordRequest request)
        {
            var user = await _userRepository.GetByIdAsync(request.UserId);
            if (user == null)
                throw new ApplicationException("User not found.");

            if (!_authService.VerifyPassword(request.CurrentPassword, user.PasswordHash))
                throw new ApplicationException("Current password is incorrect.");

            if (request.NewPassword != request.ConfirmPassword)
                throw new ApplicationException("New password and confirmation do not match.");

            var newHash = _authService.HashPassword(request.NewPassword);
            user.SetPasswordHash(newHash);

            _userRepository.Update(user);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task ForgotPasswordAsync(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null)
                return; 

            var token = Guid.NewGuid().ToString("N");
            var expires = DateTime.UtcNow.AddHours(1);

            user.SetResetPasswordToken(token, expires);
            _userRepository.Update(user);
            await _unitOfWork.SaveChangesAsync();


        }
        public async Task ResetPasswordAsync(ResetPasswordRequest request)
        {
            var user = await _userRepository.GetByResetPasswordTokenAsync(request.Token);
            if (user == null || user.ResetPasswordExpires < DateTime.UtcNow)
                throw new ApplicationException("Invalid or expired reset token.");

            if (request.NewPassword != request.ConfirmPassword)
                throw new ApplicationException("Passwords do not match.");

            var newHash = _authService.HashPassword(request.NewPassword);
            user.SetPasswordHash(newHash);
            user.ClearResetPasswordToken();

            _userRepository.Update(user);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
