using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VAR.Models;
using VAR.Repositries;

namespace VAR.Controllers
{
    [Authorize]
    public class PlaystationRoomController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        private readonly IPlaystationRepo _playstationRepo;

        public PlaystationRoomController(IPlaystationRepo playstationRepo)
        {
            this._playstationRepo = playstationRepo;
        }
        public async Task<IActionResult> getAllRooms()
        {
            List<Playstation>? playstations = await _playstationRepo.getAll();
            if (playstations != null) return View(playstations);
            else return View("Error");
        }
        public async Task<IActionResult> getRoomById(int id)
        {
            Playstation? playstation = await _playstationRepo.getById(id);
            if (playstation != null) return View(playstation);
            else return View("Error");
        }
    }
}
