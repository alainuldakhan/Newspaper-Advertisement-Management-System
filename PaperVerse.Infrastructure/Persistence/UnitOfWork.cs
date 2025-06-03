using PaperVerse.Core.Interfaces;
using PaperVerse.Infrastructure.Data.Context;

namespace PaperVerse.Infrastructure.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly PaperVerseDbContext _db;

        public UnitOfWork(PaperVerseDbContext db)
        {
            _db = db;
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _db.SaveChangesAsync();
        }
    }
}
