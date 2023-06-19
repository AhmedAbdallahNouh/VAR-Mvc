using Microsoft.EntityFrameworkCore;
using VAR.Models;

namespace VAR.Repositries
{
    public class ItemRepo : IItemRepo
    {
        private readonly VarDbContext dbContext;
        public ItemRepo(VarDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<Item>> getAll()
        {
            return await dbContext.Items.ToListAsync();
        }
        public async Task<List<Item>> getAllInStock()
        {
            return await dbContext.Items.Where(i => i.Price != 0).ToListAsync();
        }
        public async Task<Item?> getById(int id)
        {
            return await dbContext.Items.SingleOrDefaultAsync(i => i.Id == id);
        }
        public async Task<Item?> getByName(string name)
        {
            return await dbContext.Items.SingleOrDefaultAsync(i => i.Name == name);
        }
        public async Task<Item?> edit(Item item)
        {
            dbContext.Update(item);
            await dbContext.SaveChangesAsync();
            return item;
        }
    }
}
