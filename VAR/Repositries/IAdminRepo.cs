using VAR.Models;

namespace VAR.Repositries
{
    public interface IAdminRepo
    {
        Task<Admin?> add(Admin admin);
        Task<Admin?> edit(Admin admin);
        Task<List<Admin>> getAll();
        Task<Admin?> getById(int id);
        Task<Admin?> delete(int id);
    }
}