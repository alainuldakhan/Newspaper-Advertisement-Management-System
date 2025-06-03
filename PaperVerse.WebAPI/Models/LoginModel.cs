using System.ComponentModel.DataAnnotations;

namespace PaperVerse.WebAPI.Models
{
    public class LoginModel
    {
        [Required]
        public string Identifier { get; set; }  // Email или UserName

        [Required]
        public string Password { get; set; }
    }
}
