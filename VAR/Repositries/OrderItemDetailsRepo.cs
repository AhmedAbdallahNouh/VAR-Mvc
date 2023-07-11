using Microsoft.EntityFrameworkCore;
using VAR.Models;

namespace VAR.Repositries
{
    public class OrderItemDetailsRepo : IOrderItemDetailsRepo
    {
        private readonly VarDbContext dbContext;

        public OrderItemDetailsRepo(VarDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<OrderItemDetails>> GetOrderItemDetailsByOrderId(int orderId)
        {
            return await dbContext.orderItemDetails.Include(oid => oid.Order)
                .Include(oid => oid.Item).Where(oid => oid.orderId == orderId).ToListAsync();
        }

        //public async Task<List<OrderItemDetails>> GetOrderItemDetailsByOrderNumber(int orderNumber)
        //{
        //    return await dbContext.orderItemDetails.Where(oid => oid.orderId == orderNumber).ToListAsync();
        //}

        public async Task<OrderItemDetails?> Add(OrderItemDetails orderItemDetails)
        {
            await dbContext.orderItemDetails.AddAsync(orderItemDetails);
            dbContext.SaveChanges();
            return orderItemDetails;
        }

        public async Task<OrderItemDetails?> Update(OrderItemDetails orderItemDetailsToUpdate)
        {

            OrderItemDetails? oldOrderItemDetails = await dbContext.orderItemDetails
                .SingleOrDefaultAsync(oid => oid.orderId == orderItemDetailsToUpdate.orderId && oid.itemId == orderItemDetailsToUpdate.itemId);

            if (oldOrderItemDetails != null)
            {
                // Update the object's properties
                oldOrderItemDetails.Quantity = orderItemDetailsToUpdate.Quantity;
                oldOrderItemDetails.TotalPrice = orderItemDetailsToUpdate.TotalPrice;


                // Save the changes to the database
                dbContext.SaveChanges();
            }

            return orderItemDetailsToUpdate;
        }

    }
}
