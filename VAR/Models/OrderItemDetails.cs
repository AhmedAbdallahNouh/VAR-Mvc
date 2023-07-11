using System.ComponentModel.DataAnnotations.Schema;

namespace VAR.Models
{
    public class OrderItemDetails
    {
      
        [ForeignKey("Order")]
        public int orderId { get; set; }
        public virtual Order? Order { get; set; }

        [ForeignKey("Item")]
        public int itemId { get; set; }
        public virtual Item? Item { get; set; }

        public int Quantity { get; set; }

        [Column(TypeName = "money")]
        public double TotalPrice { get; set; }
    }
}
