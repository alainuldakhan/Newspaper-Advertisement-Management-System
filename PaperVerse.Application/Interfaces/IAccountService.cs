using PaperVerse.Application.DTO_s;
using System.Security.Claims;


namespace PaperVerse.Application.Interfaces
{
    public interface IAccountService
    {
        Task<LoginResponse> RefreshTokenAsync(string refreshToken);
        Task<UserDto> GetCurrentUserAsync(ClaimsPrincipal user);
        Task ChangePasswordAsync(ChangePasswordRequest request);
        Task ForgotPasswordAsync(string email);
        Task ResetPasswordAsync(ResetPasswordRequest request);
    }
}
