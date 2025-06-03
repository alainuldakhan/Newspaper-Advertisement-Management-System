using PaperVerse.Application.DTO_s;

namespace PaperVerse.Application.Interfaces
{
    public interface IUserManagementService
    {
        Task<IEnumerable<UserDto>> GetAllAsync();
        Task<UserDto> GetByIdAsync(Guid id);
        Task UpdateAsync(Guid id, UpdateUserRequest request);
        Task DeleteAsync(Guid id);
    }
}
