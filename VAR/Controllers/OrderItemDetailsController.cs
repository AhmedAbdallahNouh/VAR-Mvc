using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VAR.Models;
using VAR.Repositries;
using VAR.ViewModels;

namespace VAR.Controllers
{
    public class OrderItemDetailsController : Controller
    {
        private readonly IOrderItemDetailsRepo orderItemDetailsRepo;

        public OrderItemDetailsController(IOrderItemDetailsRepo orderItemDetailsRepo)
        {
            this.orderItemDetailsRepo = orderItemDetailsRepo;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public IActionResult Add()
        {          
         return View();
                               
        }
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] OrderItemDetails orderItemDetailsToAdd)
        {
            if (ModelState.IsValid)
            {
                OrderItemDetails? orderItemDetails = await orderItemDetailsRepo.Add(orderItemDetailsToAdd);
                return Json(orderItemDetailsToAdd);
                
            }
            return View("Error");

        }
        [HttpPost]
        public async Task<IActionResult> AddJustItemsOrder([FromForm] OrderItemDetails orderItemDetailsToAdd)
        {
            if (ModelState.IsValid)
            {
                OrderItemDetails? orderItemDetails = await orderItemDetailsRepo.Add(orderItemDetailsToAdd);
                return Json(orderItemDetailsToAdd);

            }
            return View("Error");

        }
    }
}
