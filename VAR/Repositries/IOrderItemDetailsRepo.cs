using VAR.Models;

namespace VAR.Repositries
{
    public interface IOrderItemDetailsRepo
    {
        Task<OrderItemDetails?> Add(OrderItemDetails orderItemDetails);
        Task<List<OrderItemDetails>> GetOrderItemDetailsByOrderId(int orderId);
        Task<OrderItemDetails?> Update(OrderItemDetails orderItemDetailsToUpdate);
    }
}