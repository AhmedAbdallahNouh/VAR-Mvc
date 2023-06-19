using VAR.Models;

namespace VAR.Repositries
{
    public interface IAuthnticationRepo
    {
        Task<bool> checkPassword(Admin user, string password);
        Task<Admin?> findByEmail(string email);
    }
}