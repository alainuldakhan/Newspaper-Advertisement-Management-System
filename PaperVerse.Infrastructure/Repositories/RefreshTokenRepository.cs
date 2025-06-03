using Microsoft.EntityFrameworkCore;
using PaperVerse.Core.Entities;
using PaperVerse.Core.Interfaces;
using PaperVerse.Infrastructure.Data.Context;

namespace PaperVerse.Infrastructure.Repositories
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly PaperVerseDbContext _db;

        public RefreshTokenRepository(PaperVerseDbContext db)
        {
            _db = db;
        }

        public async Task AddAsync(RefreshToken refreshToken)
        {
            await _db.RefreshTokens.AddAsync(refreshToken);
        }

        public async Task<RefreshToken> GetByTokenAsync(string token)
        {
            return await _db.RefreshTokens
                            .AsNoTracking()
                            .FirstOrDefaultAsync(rt => rt.Token == token && !rt.Revoked);
        }

        public async Task RemoveAsync(RefreshToken refreshToken)
        {
            _db.RefreshTokens.Remove(refreshToken);
            await Task.CompletedTask;
        }
    }
}
