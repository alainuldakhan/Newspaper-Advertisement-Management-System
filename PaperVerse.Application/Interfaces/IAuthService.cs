using PaperVerse.Application.DTO_s;
using System.Security.Claims;

namespace PaperVerse.Application.Interfaces
{
    public interface IAuthService
    {
        Task<LoginResponse> LoginAsync(LoginRequest request);
        Task LogoutAsync(string refreshToken);
    }
}
