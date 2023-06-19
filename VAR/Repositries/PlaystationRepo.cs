using Microsoft.EntityFrameworkCore;
using VAR.Models;

namespace VAR.Repositries
{
    public class PlaystationRepo : IPlaystationRepo
    {
        private readonly VarDbContext dbContext;
        public PlaystationRepo(VarDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<Playstation>> getAll()
        {
            return await dbContext.Playstations.Include(p => p.Orders).ToListAsync();
        }
        public async Task<Playstation?> getById(int id)
        {
            return await dbContext.Playstations.Include(p => p.Orders).SingleOrDefaultAsync(p => p.Id == id);
        }
        public async Task<Playstation?> edit(Playstation playstation)
        {
            dbContext.Update(playstation);
            await dbContext.SaveChangesAsync();
            return playstation;
        }
    }
}
