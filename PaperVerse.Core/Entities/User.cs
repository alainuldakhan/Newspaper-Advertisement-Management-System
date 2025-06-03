using PaperVerse.Core.Enums;
using PaperVerse.Core.ValueObjects;

namespace PaperVerse.Core.Entities
{
    public class User
    {
        public Guid Id { get; private set; }
        public string FullName { get; private set; }
        public string UserName { get; private set; }
        public EmailAddress Email { get; private set; }
        public string PasswordHash { get; private set; }
        public UserRole Role { get; private set; }

        public string? ResetPasswordToken { get; private set; }
        public DateTime? ResetPasswordExpires { get; private set; }

        public DateTime CreatedAt { get; private set; }
        public DateTime UpdatedAt { get; private set; }

        // Navigation property: assume RefreshToken is another entity in Core.Entities
        public ICollection<RefreshToken> RefreshTokens { get; private set; } = new List<RefreshToken>();

        // EF Core requires a parameterless constructor
        private User() { }

        public User(string fullName, string userName, EmailAddress email, string passwordHash, UserRole role)
        {
            if (string.IsNullOrWhiteSpace(fullName))
                throw new ArgumentException("FullName cannot be empty.", nameof(fullName));
            if (string.IsNullOrWhiteSpace(userName))
                throw new ArgumentException("UserName cannot be empty.", nameof(userName));
            if (email == null)
                throw new ArgumentNullException(nameof(email), "Email cannot be null.");
            if (string.IsNullOrWhiteSpace(passwordHash))
                throw new ArgumentException("PasswordHash cannot be empty.", nameof(passwordHash));

            Id = Guid.NewGuid();
            FullName = fullName.Trim();
            UserName = userName.Trim();
            Email = email;               // EmailAddress VO validates format internally
            PasswordHash = passwordHash;
            Role = role;

            CreatedAt = DateTime.UtcNow;
            UpdatedAt = CreatedAt;
        }

        public void UpdateFullName(string newFullName)
        {
            if (string.IsNullOrWhiteSpace(newFullName))
                throw new ArgumentException("FullName cannot be empty.", nameof(newFullName));

            FullName = newFullName.Trim();
            UpdatedAt = DateTime.UtcNow;
        }

        public void UpdateUserName(string newUserName)
        {
            if (string.IsNullOrWhiteSpace(newUserName))
                throw new ArgumentException("UserName cannot be empty.", nameof(newUserName));

            UserName = newUserName.Trim();
            UpdatedAt = DateTime.UtcNow;
        }

        public void UpdateEmail(string newEmail)
        {
            if (string.IsNullOrWhiteSpace(newEmail))
                throw new ArgumentException("Email cannot be empty.", nameof(newEmail));

            Email = new EmailAddress(newEmail.Trim());
            UpdatedAt = DateTime.UtcNow;
        }

        public void ChangeRole(UserRole newRole)
        {
            Role = newRole;
            UpdatedAt = DateTime.UtcNow;
        }

        public void SetPasswordHash(string newPasswordHash)
        {
            if (string.IsNullOrWhiteSpace(newPasswordHash))
                throw new ArgumentException("PasswordHash cannot be empty.", nameof(newPasswordHash));

            PasswordHash = newPasswordHash;
            UpdatedAt = DateTime.UtcNow;
        }

        public void SetResetPasswordToken(string token, DateTime expiresAt)
        {
            if (string.IsNullOrWhiteSpace(token))
                throw new ArgumentException("Reset token cannot be empty.", nameof(token));
            if (expiresAt <= DateTime.UtcNow)
                throw new ArgumentException("Expiration time must be in the future.", nameof(expiresAt));

            ResetPasswordToken = token;
            ResetPasswordExpires = expiresAt;
            UpdatedAt = DateTime.UtcNow;
        }

        public void ClearResetPasswordToken()
        {
            ResetPasswordToken = null;
            ResetPasswordExpires = null;
            UpdatedAt = DateTime.UtcNow;
        }

        public bool IsResetTokenValid(string token)
        {
            return
                !string.IsNullOrWhiteSpace(ResetPasswordToken) &&
                ResetPasswordToken == token &&
                ResetPasswordExpires.HasValue &&
                ResetPasswordExpires.Value > DateTime.UtcNow;
        }

        public void AddRefreshToken(RefreshToken refreshToken)
        {
            if (refreshToken == null)
                throw new ArgumentNullException(nameof(refreshToken));

            RefreshTokens.Add(refreshToken);
            UpdatedAt = DateTime.UtcNow;
        }

        public void RevokeRefreshToken(string tokenValue)
        {
            var existing =
                RefreshTokens.FirstOrDefault(rt => rt.Token == tokenValue && !rt.Revoked && !rt.IsExpired());

            if (existing != null)
            {
                existing.Revoke();
                UpdatedAt = DateTime.UtcNow;
            }
        }
    }
}
