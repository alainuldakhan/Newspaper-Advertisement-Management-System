using Microsoft.EntityFrameworkCore;
using PaperVerse.Core.Interfaces;
using PaperVerse.Core.Entities;
using PaperVerse.Infrastructure.Data.Context;

namespace PaperVerse.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly PaperVerseDbContext _db;

        public UserRepository(PaperVerseDbContext db)
        {
            _db = db;
        }

        public async Task AddAsync(User user)
        {
            await _db.Users.AddAsync(user);
        }

        public async Task<User> GetByIdAsync(Guid id)
        {
            return await _db.Users.FindAsync(id);
        }
        public async Task<User> GetByEmailAsync(string email)
        {
            return await _db.Users.FirstOrDefaultAsync(u => u.Email.Value == email);
        }

        public async Task<User> GetByUserNameAsync(string userName)
        {
            return await _db.Users.FirstOrDefaultAsync(u => u.UserName == userName);
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _db.Users.ToListAsync();
        }

        public void Update(User user)
        {
            _db.Users.Update(user);
        }

        public void Delete(User user)
        {
            _db.Users.Remove(user);
        }

        public async Task<User> GetByResetPasswordTokenAsync(string token)
        {
            return await _db.Users.FirstOrDefaultAsync(u => u.ResetPasswordToken == token);
        }
    }
}
