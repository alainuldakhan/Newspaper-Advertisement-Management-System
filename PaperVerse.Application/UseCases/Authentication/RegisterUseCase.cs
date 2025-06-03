using PaperVerse.Application.DTO_s;
using PaperVerse.Application.Interfaces;
using PaperVerse.Core.Enums;
using PaperVerse.Core.Interfaces;
using PaperVerse.Core.ValueObjects;
using PaperVerse.Core.Entities;

namespace PaperVerse.Application.UseCases.Authentication
{
    public class RegisterUseCase : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IAuthenticationService _authService;
        private readonly IUnitOfWork _unitOfWork;

        public RegisterUseCase(
            IUserRepository userRepository,
            IAuthenticationService authService,
            IUnitOfWork unitOfWork)
        {
            _userRepository = userRepository;
            _authService = authService;
            _unitOfWork = unitOfWork;
        }

        public async Task<UserDto> RegisterAsync(RegisterRequest request)
        {
            // 1) Check if email is already registered
            var existingByEmail = await _userRepository.GetByEmailAsync(request.Email);
            if (existingByEmail != null)
                throw new ApplicationException("Email already registered.");

            // 2) Check if username is already taken
            var existingByUserName = await _userRepository.GetByUserNameAsync(request.UserName);
            if (existingByUserName != null)
                throw new ApplicationException("Username already taken.");

            // 3) Create EmailAddress value object
            var emailVo = new EmailAddress(request.Email);

            // 4) Hash the password
            var passwordHash = _authService.HashPassword(request.Password);

            // 5) Pasrse the user role
            if (!Enum.TryParse<UserRole>(request.Role, true, out var parsedRole))
                throw new ApplicationException("Invalid user role.");

            // 6) Create a new User entity
            var user = new User(
                fullName: request.FullName.Trim(),
                userName: request.UserName.Trim(),
                email: emailVo,
                passwordHash: passwordHash,
                role: parsedRole
            );

            // 7) Save the user to DB
            await _userRepository.AddAsync(user);
            await _unitOfWork.SaveChangesAsync();

            // 8) Return the DTO
            return new UserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                UserName = user.UserName,
                Email = user.Email.Value,
                Role = user.Role.ToString()
            };
        }
    }
}
