using System.ComponentModel.DataAnnotations;

namespace PaperVerse.WebAPI.Models
{
    public class LogoutModel
    {
        [Required]
        public string RefreshToken { get; set; }
    }
}