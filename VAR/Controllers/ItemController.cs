using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using VAR.Models;
using VAR.Repositries;

namespace VAR.Controllers
{
    public class ItemController : Controller
    {
        private readonly IItemRepo itemRepo;

        public ItemController(IItemRepo itemRepo)
        {
            this.itemRepo = itemRepo;
        }
        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> getAllItemsInStock()
        {
           List<Item>? items =  await itemRepo.getAllInStock();

           ViewBag.Items = new SelectList(items, "Id", "Name");
           return PartialView("_getAllItemsInStock",items);
        }

        //public async Task<IActionResult> itemCart(int )
        //{

        //    return PartialView("_itemsCart");
        //}
        public IActionResult itemCart()
        {

            return PartialView("_itemsCart");
        }
    }
}
