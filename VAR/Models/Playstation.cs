using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace VAR.Models
{
    public class Playstation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        [DisplayName("Room Name")]
        public string RoomName { get; set; }

        [Required]
        [MaxLength(50)]
        [DisplayName("Playstation Version")]
        public string Version { get; set; }

        [Required]
        [MaxLength(50)]
        [DisplayName("Price")]
        public int Price { get; set; }

        //Relations
        public virtual List<Order> Orders { get; set; } = new List<Order>();
    }
}
