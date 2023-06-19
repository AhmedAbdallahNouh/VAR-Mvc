using Microsoft.EntityFrameworkCore;
using VAR.Models;

namespace VAR.Repositries
{
    public class AuthnticationRepo : IAuthnticationRepo
    {
        private readonly VarDbContext dbContext;
        private readonly IAdminRepo _adminRepo;

        public AuthnticationRepo(VarDbContext dbContext, IAdminRepo adminRepo)
        {
            this.dbContext = dbContext;
            this._adminRepo = adminRepo;
        }
        public async Task<Admin?> findByEmail(string email)
        {
            Admin? admin = await dbContext.Admins.FirstOrDefaultAsync(a => a.Email == email);
            return admin;
        }
        public async Task<bool> checkPassword(Admin user,string password)
        {
            Admin? admin = await _adminRepo.getById(user.Id);
            return (admin != null && admin.password == password) ? true : false;
        }
    }
}
