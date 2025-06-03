using PaperVerse.Application.DTO_s;
using PaperVerse.Application.Interfaces;
using PaperVerse.Core.Enums;
using PaperVerse.Core.Interfaces;

namespace PaperVerse.Application.UseCases.Users
{
    public class UserManagementUseCase : IUserManagementService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _unitOfWork;

        public UserManagementUseCase(
            IUserRepository userRepository,
            IUnitOfWork unitOfWork)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            var users = await _userRepository.GetAllAsync();
            var result = new List<UserDto>();
            foreach (var u in users)
            {
                result.Add(new UserDto
                {
                    Id = u.Id,
                    FullName = u.FullName,
                    UserName = u.UserName,
                    Email = u.Email.Value,
                    Role = u.Role.ToString()
                });
            }
            return result;
        }

        public async Task<UserDto> GetByIdAsync(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return null;

            return new UserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                UserName = user.UserName,
                Email = user.Email.Value,
                Role = user.Role.ToString()
            };
        }

        public async Task UpdateAsync(Guid id, UpdateUserRequest request)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                throw new ApplicationException("User not found.");

            user.UpdateFullName(request.FullName);
            user.UpdateUserName(request.UserName);
            user.UpdateEmail(request.Email); 
            if (Enum.TryParse<UserRole>(request.Role, true, out var parsedRole))
            {
                user.ChangeRole(parsedRole);
            }
            else
            {
                throw new ApplicationException("Invalid role.");
            }

            _userRepository.Update(user);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                throw new ApplicationException("User not found.");

            _userRepository.Delete(user);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
