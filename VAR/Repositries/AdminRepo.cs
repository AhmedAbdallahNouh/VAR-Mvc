using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using VAR.Models;

namespace VAR.Repositries
{
    public class AdminRepo : IAdminRepo
    {
        
        private readonly VarDbContext dbContext;
        public AdminRepo(VarDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<Admin>> getAll()
        {
            return await dbContext.Admins.Include(a => a.Orders).ToListAsync();
        }
        public async Task<Admin?> getById(int id)
        {
            return await dbContext.Admins.Include(a => a.Orders).SingleOrDefaultAsync(a => a.Id == id);
        }
        public async Task<Admin?> add(Admin admin)
        {
            await dbContext.AddAsync(admin);
            await dbContext.SaveChangesAsync();
            return admin;
        }
        public async Task<Admin?> edit(Admin admin)
        {
            dbContext.Update(admin);
            await dbContext.SaveChangesAsync();
            return admin;
        }
        public async Task<Admin?> delete(int id)
        {
            Admin? admin = await getById(id);
            if (admin != null)
            {
                dbContext.Remove(admin);
                await dbContext.SaveChangesAsync();
            }
            return admin;
        }
    }
}

