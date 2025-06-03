using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PaperVerse.Core.Entities;

namespace PaperVerse.Infrastructure.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");
            builder.HasKey(u => u.Id);

            builder.Property(u => u.FullName)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(u => u.UserName)
                   .IsRequired()
                   .HasMaxLength(50);
            builder.HasIndex(u => u.UserName).IsUnique();

            builder.OwnsOne(u => u.Email, eb =>
            {
                eb.Property(e => e.Value)
                  .HasColumnName("Email")
                  .IsRequired()
                  .HasMaxLength(100);
            });

            builder.Property(u => u.PasswordHash)
                   .IsRequired();

            builder.Property(u => u.Role)
                   .IsRequired();
        }
    }
}
