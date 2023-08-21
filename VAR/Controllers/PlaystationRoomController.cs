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
        public async Task<IActionResult> getAllRoomsForAdmin()
        {
           return await getAllRooms();
        }
        public async Task<IActionResult> getRoomById(int id)
        {
            Playstation? playstation = await _playstationRepo.getById(id);
            Order order = new Order();
            ViewBag.order = order;
            if (playstation != null) return View(playstation);
            else return View("Error");
        }

        [HttpGet]
        public IActionResult AddPlaystationRoom()
        {

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> AddPlaystationRoom(Playstation playstationRoomToAdd)
        {
            if (ModelState.IsValid)
            {
                Playstation? playstation = await _playstationRepo.add(playstationRoomToAdd);
                return RedirectToAction("getAllRoomsForAdmin");
            }
            return RedirectToAction("getAllRoomsForAdmin", "PlaystationRoom");

        }

        public async Task<IActionResult> Edit(int id)
        {
            Playstation? playstation = await _playstationRepo.getById(id);
            if (playstation == null)
            {
                return NotFound();
            }
            return View(playstation);
        }
        [HttpPost]
        public async Task<IActionResult> Edit(Playstation playstation)
        {
            if (ModelState.IsValid)
            {
                await _playstationRepo.edit(playstation);
                return RedirectToAction("getAllRoomsForAdmin");
            }
            return View(playstation);
        }
        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            await _playstationRepo.delete(id);
            return RedirectToAction("getAllRooms");
        }

    }
}
