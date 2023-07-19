using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace VAR.Models
{
    public class Admin
    {
        
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [PasswordPropertyText]
        public string password { get; set; }

        [Required]
        [MaxLength(11)]
        [RegularExpression("^(011|012|010|015)\\d{8}$"
            , ErrorMessage = "Phone muststart with 011 or 012 or 010 or 015 and must be 11 numbers")]
        public string phone { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        //Relations
        public virtual List<Order> Orders { get; set; } = new List<Order>();

    }
}
