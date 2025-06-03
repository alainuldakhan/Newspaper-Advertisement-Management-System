using System.ComponentModel.DataAnnotations;


namespace PaperVerse.Application.DTO_s
{
    public class LoginRequest
    {
        [Required]
        public string Identifier { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}
