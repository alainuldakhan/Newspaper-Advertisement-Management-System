using PaperVerse.Core.Entities;

namespace PaperVerse.Core.Interfaces
{
    public interface IUserRepository
    {
        Task AddAsync(User user);

        Task<User> GetByIdAsync(Guid id);
        Task<User> GetByEmailAsync(string email);
        Task<User> GetByUserNameAsync(string userName);
        Task<IEnumerable<User>> GetAllAsync();
        void Update(User user);
        void Delete(User user);
        Task<User> GetByResetPasswordTokenAsync(string token);
    }
}
