using System.ComponentModel.DataAnnotations;


namespace PaperVerse.Application.DTO_s
{
    public class RegisterRequest
    {
        [Required]
        public required string FullName { get; set; } = string.Empty;

        [Required]
        public required string UserName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public required string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        public required string Password { get; set; }

        [Required]
        [EnumDataType(typeof(PaperVerse.Core.Enums.UserRole))]
        public required string Role { get; set; }
    }
}
