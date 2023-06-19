using Microsoft.AspNetCore.Authentication.Cookies;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

namespace VAR.ViewModels
{
    public class LoginVM
    {
        [Key]
        [EmailAddress]
        [Required]
        [Display(Name ="Email Address")]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        [Required]
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }
}
