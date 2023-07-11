using Microsoft.EntityFrameworkCore;
using System.Globalization;
using VAR.Models;
using VAR.ViewModels;

namespace VAR.Repositries
{
    public class OrderRepo : IOrderRepo
    {
        private readonly VarDbContext dbContext;

        public OrderRepo(VarDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<List<Order>> getAll()
        {
            return await dbContext.Orders.ToListAsync();
        }

        public async Task<Order?> getById(int id)
        {
            return await dbContext.Orders.SingleOrDefaultAsync(o => o.Id == id);
        }
        //public async Task<Item?> getByNumber(int number)
        //{
        //    return await dbContext.Orders.SingleOrDefaultAsync(o => o.Number == number);
        //}
        public async Task<Order?> Add(OrderVM orderVM)
        {

            Order order = new Order()
            {
                StartTime = DateTime.Parse(orderVM.StartTime),
                EndTime = DateTime.Parse(orderVM.EndTime),
                adminID = orderVM.adminID,
                playstationID = orderVM.playstationID
            };

            await dbContext.Orders.AddAsync(order);
            dbContext.SaveChanges();
            return order;
        }
        public async Task<Order?> edit(Order order)
        {
            dbContext.Update(order);
            await dbContext.SaveChangesAsync();
            return order;
        }

        public async Task<Order?> delete(Order order)
        {
            dbContext.Remove(order);
            await dbContext.SaveChangesAsync();
            return order;
        }
    }
}
