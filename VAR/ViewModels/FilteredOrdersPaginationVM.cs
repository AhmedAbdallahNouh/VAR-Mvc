using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace VAR.ViewModels
{
    public class FilteredOrdersPaginationVM
    {
        public string? AdminName { get; set; }
        public string? PlaystationRoomName { get; set; }

        [DataType(DataType.Date)]
        public DateTime? StartTime { get; set; }
        [DataType(DataType.Date)]
        public DateTime? EndTime { get; set; }
        public int page { get; set; } = 1;
        public int size { get; set; } = 10;

    }
}
