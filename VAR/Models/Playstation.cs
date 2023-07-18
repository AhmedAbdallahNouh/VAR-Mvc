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
        [DisplayName("Single Price")]
        public int SinglePrice { get; set; }


        [Required]
        [DisplayName("Multi Price")]
        public int MultiPrice { get; set; }

        //Relations
        public virtual List<Order> Orders { get; set; } = new List<Order>();
    }
}
