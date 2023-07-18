using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
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
        public async Task<IActionResult> getAllItems()
        {
            List<Item>? items = await itemRepo.getAll();     
            return View(items);
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

        [HttpGet]
        public IActionResult AddItem()
        {

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> AddItem(Item itemToAdd)
        {
            if (ModelState.IsValid)
            {
                Item? item = await itemRepo.Add(itemToAdd);
                return RedirectToAction("getAllItems");
            }
            return View();

        }

        public async Task<IActionResult> Edit(int id)
        {
            Item? item = await itemRepo.getById(id);
            if (item == null)
            {
                return NotFound();
            }
            return View(item);
        }
        [HttpPost]
        public async Task<IActionResult> Update(Item item)
        {
            if (ModelState.IsValid)
            {
                await itemRepo.edit(item);
                return RedirectToAction("getAllItems");
            }
            return View(item);
        }
        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {          
                await itemRepo.delete(id);
                return RedirectToAction("getAllItems");
        }
        public IActionResult itemCart()
        {

            return PartialView("_itemsCart");
        }
    }
}
