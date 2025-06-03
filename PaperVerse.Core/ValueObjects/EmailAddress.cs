using PaperVerse.Core.Exceptions;
using System.Text.RegularExpressions;


namespace PaperVerse.Core.ValueObjects
{
    public class EmailAddress
    {
        private static readonly Regex EmailRegex = new(@"^\S+@\S+\.\S+$", RegexOptions.Compiled);

        public string Value { get; }

        public EmailAddress(string value)
        {
            if (string.IsNullOrWhiteSpace(value) || !EmailRegex.IsMatch(value))
                throw new CoreException("Invalid e-mail format.");
            Value = value.ToLowerInvariant();
        }
    }
}
