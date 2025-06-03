using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PaperVerse.Application.Interfaces;
using PaperVerse.Core.Entities;
using BCryptNet = BCrypt.Net.BCrypt;

namespace PaperVerse.Infrastructure.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly string _jwtSecret;
        public int JwtLifespanMinutes { get; }

        public AuthenticationService(IConfiguration configuration)
        {
            _jwtSecret = configuration["Jwt:Key"];
            JwtLifespanMinutes = int.Parse(configuration["Jwt:ExpiryMinutes"]);
        }

        public string HashPassword(string plainPassword)
        {
            return BCryptNet.HashPassword(plainPassword);
        }

        public bool VerifyPassword(string plainPassword, string passwordHash)
        {
            return BCryptNet.Verify(plainPassword, passwordHash);
        }

        public string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim("username", user.UserName),
                new Claim("role", user.Role.ToString())
            };

            var token = new JwtSecurityToken(
                expires: DateTime.UtcNow.AddMinutes(JwtLifespanMinutes),
                signingCredentials: creds,
                claims: claims
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
