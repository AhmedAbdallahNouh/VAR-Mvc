using VAR.Models;
using VAR.ViewModels;

namespace VAR.Repositries
{
    public interface IOrderRepo
    {
        Task<Order?> Add(OrderVM orderVM);
        Task<Order?> delete(int id);
        Task<Order?> edit(Order order);
        Task<List<Order>> getAll();
        Task<Order?> getById(int id);
    }
}