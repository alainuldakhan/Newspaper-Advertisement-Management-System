using System;

namespace PaperVerse.Core.Entities
{
    public class RefreshToken
    {
        public Guid Id { get; private set; }
        public string Token { get; private set; } = null!;
        public Guid UserId { get; private set; }
        public DateTime ExpiresAt { get; private set; }
        public bool Revoked { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public DateTime? RevokedAt { get; private set; }

        private RefreshToken() { } // Для EF Core

        public RefreshToken(Guid userId, string token, DateTime expiresAt)
        {
            if (string.IsNullOrWhiteSpace(token))
                throw new ArgumentException("Token cannot be empty.", nameof(token));
            if (expiresAt <= DateTime.UtcNow)
                throw new ArgumentException("Expiration time must be in the future.", nameof(expiresAt));

            Id = Guid.NewGuid();
            UserId = userId;
            Token = token;
            ExpiresAt = expiresAt;
            Revoked = false;
            CreatedAt = DateTime.UtcNow;
        }

        /// <summary>
        /// Помечает токен отклоненным и сохраняет время отзыва.
        /// </summary>
        public void Revoke()
        {
            if (!Revoked)
            {
                Revoked = true;
                RevokedAt = DateTime.UtcNow;
            }
        }

        /// <summary>
        /// Возвращает true, если срок действия токена истёк (включая совпадение моментов).
        /// </summary>
        public bool IsExpired() => DateTime.UtcNow >= ExpiresAt;

        /// <summary>
        /// Возвращает true, если токен ещё действителен (не истёк и не отозван).
        /// </summary>
        public bool IsActive() => !Revoked && !IsExpired();
    }
}
