using VAR.Models;

namespace VAR.ViewModels

{
    public class PaginationVM
    {
        public int Total { get; set; }
        public int Page { get; set; }
        public List<Order>? Orders { get; set; } = new List<Order>();
        public PaginationVM(int Total, int Page, List<Order> Orders)
        {
            this.Total = Total;
            this.Page = Page;
            this.Orders = Orders;
        }
    }
}
