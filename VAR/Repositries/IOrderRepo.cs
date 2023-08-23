using VAR.Models;
using VAR.ViewModels;

namespace VAR.Repositries
{
    public interface IOrderRepo
    {
        Order? Add(OrderVM orderVM);
        Task<Order?> delete(int id);
        Task<Order?> edit(Order order);
        Task<List<Order>> getAll();
        PaginationVM getOrdersPagination(int page, int size);
        PaginationVM GetFilteredOrdersPagination(FilteredOrdersPaginationVM filteredOrdersPaginationVM);
        Task<Order?> getById(int id);
    }
}