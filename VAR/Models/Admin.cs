using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace VAR.Models
{
    public class Admin
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        public string password { get; set; }

        [Required]
        [RegularExpression("^01[0125][0-9]{8}$" 
            , ErrorMessage = "Phone muststart with 011 or 012 or 010 or 015 and must be 11 numbers") ]
        public int phone { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        //Relations
        public virtual List<Order> Orders { get; set; } = new List<Order>();

    }
}
