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
            return await dbContext.Orders.Include(o=> o.Admin).Include(o=>o.Playstation).ToListAsync();
        }

        public PaginationVM getOrdersPagination(int page, int size)
        {
            var total = dbContext.Orders.Count();
            var pages = (int)Math.Ceiling((decimal)total / size);

            var result = (dbContext.Orders.Include(o => o.Admin).Include(o => o.Playstation)).Skip((page - 1) * size).Take(size).ToList();
            PaginationVM paginationVM = new PaginationVM(total, pages, result);
            return paginationVM;
        }
        public async Task<Order?> getById(int id)
        {
            return await dbContext.Orders.Include(o => o.Admin).Include(o => o.Playstation).SingleOrDefaultAsync(o => o.Id == id);
        }
        //public async Task<Item?> getByNumber(int number)
        //{
        //    return await dbContext.Orders.SingleOrDefaultAsync(o => o.Number == number);
        //}
        public async Task<Order?> Add(OrderVM orderVM)
        {

            Order order = new Order()
            {
                StartTime = orderVM.StartTime !=null ? DateTime.Parse(orderVM.StartTime):null,
                EndTime = orderVM.EndTime != null ? DateTime.Parse(orderVM.EndTime) : null ,
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

        public async Task<Order?> delete(int id)
        {
            Order? order = await getById(id);
            if (order != null)
            {
                dbContext.Remove(order);
                await dbContext.SaveChangesAsync();
            }
            return order;
        }
    }
}
