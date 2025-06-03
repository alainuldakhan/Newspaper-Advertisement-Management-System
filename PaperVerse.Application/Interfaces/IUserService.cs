using PaperVerse.Application.DTO_s;

namespace PaperVerse.Application.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> RegisterAsync(RegisterRequest request);
    }
}