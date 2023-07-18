using VAR.Models;

namespace VAR.Repositries
{
    public interface IPlaystationRepo
    {
        Task<List<Playstation>?> getAll();
        Task<Playstation?> edit(Playstation playstation);
        Task<Playstation?> add(Playstation playstation);
        Task<Playstation?> getById(int id);
        Task<Playstation?> delete(int id);
    }
}