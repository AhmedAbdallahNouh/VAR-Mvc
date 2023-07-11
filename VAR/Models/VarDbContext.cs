using Microsoft.EntityFrameworkCore;

namespace VAR.Models
{
    public class VarDbContext : DbContext
    {
        public VarDbContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderItemDetails>().HasKey(o => new { o.orderId, o.itemId });

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Playstation> Playstations { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItemDetails> orderItemDetails { get; set; }


    }
}
