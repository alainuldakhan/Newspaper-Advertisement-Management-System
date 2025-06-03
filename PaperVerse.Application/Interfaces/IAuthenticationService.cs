using PaperVerse.Core.Entities;

namespace PaperVerse.Application.Interfaces
{
    public interface IAuthenticationService
    {
        string HashPassword(string plainPassword);
        bool VerifyPassword(string plainPassword, string passwordHash);
        string GenerateJwtToken(User user);
        int JwtLifespanMinutes { get; }
    }
}