using VAR.Models;

namespace VAR.Repositries
{
    public interface IItemRepo
    {
        Task<Item?> Add(Item item);
        Task<Item?> edit(Item item);
        Task<Item?> delete(int id);
        Task<List<Item>> getAll();
        Task<List<Item>> getAllInStock();
        Task<Item?> getById(int id);
        Task<Item?> getByName(string name);
    }
}