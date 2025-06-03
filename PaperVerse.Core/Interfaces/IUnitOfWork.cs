using System.Threading.Tasks;

namespace PaperVerse.Core.Interfaces
{
    public interface IUnitOfWork
    {
        Task<int> SaveChangesAsync();
    }
}
