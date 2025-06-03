using PaperVerse.Core.Entities;

namespace PaperVerse.Core.Interfaces
{
    public interface IRefreshTokenRepository
    {
        Task AddAsync(RefreshToken refreshToken);
        Task<RefreshToken> GetByTokenAsync(string token);
        Task RemoveAsync(RefreshToken refreshToken);
    }
}
