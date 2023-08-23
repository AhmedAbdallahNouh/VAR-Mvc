using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using VAR.Models;
using VAR.Repositries;
using VAR.ViewModels;

namespace VAR.Controllers
{
    public class OrderController : Controller
    {
        private readonly IOrderRepo orderRepo;
        private readonly IPlaystationRepo playstationRepo;
        private readonly IAdminRepo adminRepo;


        public OrderController(IOrderRepo orderRepo, IPlaystationRepo playstationRepo, IAdminRepo adminRepo)
        {
            this.orderRepo = orderRepo;
            this.playstationRepo = playstationRepo;
            this.adminRepo = adminRepo;
        }
        public IActionResult Index()
        {
            return View("ordersPagination");
        }

        public IActionResult OrderModal()
        {
            return PartialView("_orderModal");
        }

        public async Task<IActionResult> getAllOrders()
        {
            List<Order> orders = await orderRepo.getAll();
            return View(orders);
        }
        public async Task<IActionResult>  GetOrdersPagination(int page = 1, int size = 10)
        {
            List<Playstation>? playstationRooms = await playstationRepo.getAll();
            ViewBag.playstationRooms = new SelectList(playstationRooms, "RoomName", "RoomName");

            List<Admin>? admins = await adminRepo.getAll();
            ViewBag.admins = new SelectList(admins, "Name", "Name");

            PaginationVM paginationVM = orderRepo.getOrdersPagination(page, size);
           
            return View(paginationVM);

        }
        public IActionResult getFilteredOrdersPaginationRedirectUrl([FromBody] FilteredOrdersPaginationVM filteredOrdersPaginationVM)
        {       
            var redirectUrl = Url.Action("getFilteredOrdersPagination", "Order", filteredOrdersPaginationVM);
            return Json(new { redirectUrl });
        }
        public async Task<IActionResult> getFilteredOrdersPagination([FromQuery] FilteredOrdersPaginationVM filteredOrdersPaginationVM)
        {

            List<Playstation>? playstationRooms = await playstationRepo.getAll();
            ViewBag.playstationRooms = new SelectList(playstationRooms, "RoomName", "RoomName");

            List<Admin>? admins = await adminRepo.getAll();
            ViewBag.admins = new SelectList(admins, "Name", "Name");

            PaginationVM paginationVM = orderRepo.GetFilteredOrdersPagination(filteredOrdersPaginationVM);

            return View("getOrdersPagination", paginationVM);

        }

        public async Task<IActionResult> getOrderById(int id)
        {
            Order? order = await orderRepo.getById(id);
            return View(order);
        }
        public async Task<IActionResult> getOrderByNumber(int number)
        {
            Order? order = await orderRepo.getById(number);
            return View(order);
        }

        [HttpGet]
        public IActionResult AddOrder()
        {
          
            return View();
        }

        [HttpPost]
        public IActionResult AddOrderDB([FromBody] OrderVM orderToAdd)
        {
            //if (orderToAdd.StartTime == null) orderToAdd.StartTime = DateTime.Now.ToString();
            Order? order = orderRepo.Add(orderToAdd);            
            return Json(order);
            
        }

    }
}
