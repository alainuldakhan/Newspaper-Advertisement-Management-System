using Microsoft.EntityFrameworkCore;
using PaperVerse.Core.Entities;
using PaperVerse.Infrastructure.Data.Configurations;

namespace PaperVerse.Infrastructure.Data.Context
{
    public class PaperVerseDbContext : DbContext
    {
        public PaperVerseDbContext(DbContextOptions<PaperVerseDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new RefreshTokenConfiguration());
        }
    }
}
