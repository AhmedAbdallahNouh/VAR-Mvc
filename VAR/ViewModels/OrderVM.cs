namespace VAR.ViewModels
{
    public class OrderVM
    {

       
        public string? StartTime { get; set; }
        public string? EndTime { get; set; }

        //Relations

        public int adminID { get; set; }

        public int? playstationID { get; set; }
    }
}
