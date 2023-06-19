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

    }
}
