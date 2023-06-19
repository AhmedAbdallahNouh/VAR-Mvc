using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VAR.Models
{
    public class Order
    {
        public int Id { get; set; }

        [DataType(DataType.Date)]
        public DateTime StartTime { get; set; }
        [DataType(DataType.Date)]
        public DateTime EndTime { get; set; }

        //Relations

        [ForeignKey("Admin")]
        public int adminID { get; set; }
        public virtual Admin? Admin { get; set; } = new Admin();

        [ForeignKey("Playstation")]
        public int playstationID { get; set; }
        public  Playstation? Playstation { get; set; } = new Playstation();
    }
}
