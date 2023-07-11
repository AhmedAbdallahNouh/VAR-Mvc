﻿using Microsoft.AspNetCore.Mvc;
using VAR.Models;
using VAR.Repositries;
using VAR.ViewModels;

namespace VAR.Controllers
{
    public class OrderController : Controller
    {
        private readonly IOrderRepo orderRepo;

        public OrderController(IOrderRepo orderRepo)
        {
            this.orderRepo = orderRepo;
        }
        public IActionResult Index()
        {
            return View();
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
        public async Task<IActionResult> getAllOrderById(int id)
        {
            Order? order = await orderRepo.getById(id);
            return View(order);
        }
        public async Task<IActionResult> getAllOrderByNumber(int number)
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
        public async Task<IActionResult> AddOrderDB([FromBody] OrderVM orderToAdd)
        {
            Order? order = await orderRepo.Add(orderToAdd);            
            return Json(order);
            
        }

    }
}