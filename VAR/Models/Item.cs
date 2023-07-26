using System.ComponentModel.DataAnnotations;

namespace VAR.Models
{
    public class Item
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string Type { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public int InStock { get; set; }

        public virtual List<OrderItemDetails>? OrderItemDetails { get; set; }
    }
}
