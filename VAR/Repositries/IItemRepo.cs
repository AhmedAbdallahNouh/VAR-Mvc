using VAR.Models;

namespace VAR.Repositries
{
    public interface IItemRepo
    {
        Task<Item?> edit(Item item);
        Task<List<Item>> getAll();
        Task<List<Item>> getAllInStock();
        Task<Item?> getById(int id);
        Task<Item?> getByName(string name);
    }
}