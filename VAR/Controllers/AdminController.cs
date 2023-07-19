using Microsoft.AspNetCore.Mvc;
using VAR.Models;
using VAR.Repositries;

namespace VAR.Controllers
{
    public class AdminController : Controller
    {
        private readonly IAdminRepo adminRepo;

        public AdminController(IAdminRepo adminRepo)
        {
            this.adminRepo = adminRepo;
        }
        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> getAllAdmins()
        {
            List<Admin> admins= await adminRepo.getAll();
            return View(admins);
        }
        public async Task<IActionResult> getAdminById(int id)
        {
            Admin? admin = await adminRepo.getById(id);
            //Order order = new Order();
            //ViewBag.order = order;
            if (admin != null) return View(admin);
            else return View("Error");
        }

        [HttpGet]
        public IActionResult addAdmin()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> addAdmin(Admin adminToAdd)
        {
            if (ModelState.IsValid)
            {
                Admin? admin = await adminRepo.add(adminToAdd);
                return RedirectToAction("getAllAdmins");
            }
            return View();

        }

        public async Task<IActionResult> Edit(int id)
        {
            Admin? admin = await adminRepo.getById(id);
            if (admin == null)
            {
                return NotFound();
            }
            return View(admin);
        }
        [HttpPost]
        public async Task<IActionResult> Update(Admin admin)
        {
            if (ModelState.IsValid)
            {
                await adminRepo.edit(admin);
                return RedirectToAction("getAllAdmins");
            }
            return View("Edit",admin);
        }
        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            await adminRepo.delete(id);
            return RedirectToAction("getAllAdmins");
        }

    }
}
