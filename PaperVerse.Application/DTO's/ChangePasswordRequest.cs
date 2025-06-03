using System;

namespace PaperVerse.Application.DTO_s
{
    public class ChangePasswordRequest
    {
        public Guid UserId { get; set; }
        public required string CurrentPassword { get; set; }
        public required string NewPassword { get; set; }
        public required string ConfirmPassword { get; set; }
    }
}
