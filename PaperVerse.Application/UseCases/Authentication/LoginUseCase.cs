using PaperVerse.Application.DTO_s;
using PaperVerse.Application.Interfaces;
using PaperVerse.Core.Entities;
using PaperVerse.Core.Interfaces;


namespace PaperVerse.Application.UseCases.Authentication
{
    public class LoginUseCase : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IAuthenticationService _authService;
        private readonly IRefreshTokenRepository _refreshRepo;
        private readonly IUnitOfWork _unitOfWork;

        public LoginUseCase(
            IUserRepository userRepository,
            IAuthenticationService authService,
            IRefreshTokenRepository refreshRepo,
            IUnitOfWork unitOfWork)
        {
            _userRepository = userRepository;
            _authService = authService;
            _refreshRepo = refreshRepo;
            _unitOfWork = unitOfWork;
        }

        public async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            // 1) Try to find user by email
            var user = await _userRepository.GetByEmailAsync(request.Identifier.ToLowerInvariant());

            // 2) If not found, try to find by username
            if (user == null)
                user = await _userRepository.GetByUserNameAsync(request.Identifier);

            if (user == null)
                throw new ApplicationException("Invalid credentials.");

            // 3) Check password
            if (!_authService.VerifyPassword(request.Password, user.PasswordHash))
                throw new ApplicationException("Invalid credentials.");

            // 4) Generate JWT token
            var jwtToken = _authService.GenerateJwtToken(user);

            // 5) Generate and save refresh token
            var refreshTokenValue = Guid.NewGuid().ToString("N");
            var refreshExpires = DateTime.UtcNow.AddDays(7);
            var refreshTokenEntity = new RefreshToken(user.Id, refreshTokenValue, refreshExpires);
            await _refreshRepo.AddAsync(refreshTokenEntity);
            await _unitOfWork.SaveChangesAsync();

            // 6) Return response
            return new LoginResponse
            {
                AccessToken = jwtToken,
                RefreshToken = refreshTokenValue,
                ExpiresAt = DateTime.UtcNow.AddMinutes(_authService.JwtLifespanMinutes),
                Role = user.Role.ToString()
            };
        }

        public async Task LogoutAsync(string refreshToken)
        {
            var existing = await _refreshRepo.GetByTokenAsync(refreshToken);
            if (existing == null || existing.IsExpired())
                return;

            existing.Revoke();
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
