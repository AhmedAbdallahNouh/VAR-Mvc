using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VAR.Models;
using VAR.Repositries;
using VAR.ViewModels;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;

namespace VAR.Controllers
{
    public class Account : Controller
    {
        private readonly IAuthnticationRepo _authnticationRepo;

        public Account(IAuthnticationRepo authnticationRepo )
        {
            this._authnticationRepo = authnticationRepo;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Spinner()
        {
            return PartialView("_Spinner");
        }

        [HttpGet]
        public IActionResult Login()
        {
            ClaimsPrincipal claimUser = HttpContext.User;

            if (claimUser.Identity.IsAuthenticated)
                return RedirectToAction("Index", "Home");

            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Login(LoginVM loginVM)
        {
            if (ModelState.IsValid)
            {

                Admin? user = await _authnticationRepo.findByEmail(loginVM.Email);
                if (user != null)
                {
                    bool valid = await _authnticationRepo.checkPassword(user, loginVM.Password);
                    if (valid)
                    {
                        //Dictionary<string, string> cookies = new Dictionary<string, string>
                        //{
                        //    { "Id", user.Id.ToString() },
                        //    { "Name",user.Name.ToString()}
                        //};

                        //foreach (var cookie in cookies)
                        //{
                        //    Response.Cookies.Append(cookie.Key, cookie.Value, new CookieOptions
                        //    {
                        //        Expires = DateTime.Now.AddMinutes(30),
                        //        HttpOnly = true,
                        //        Secure = true,
                        //        SameSite = SameSiteMode.Strict
                        //    });


                        //    return RedirectToAction("Index", "Home");
                        //}

                        List<Claim> claims = new List<Claim>() {
                            new Claim(ClaimTypes.Email, loginVM.Email),
                            new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                            new Claim(ClaimTypes.Name,user.Name)

                        };

                        ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims,
                        CookieAuthenticationDefaults.AuthenticationScheme);

                        AuthenticationProperties properties = new AuthenticationProperties()
                        {

                            AllowRefresh = true,
                            IsPersistent = loginVM.RememberMe
                        };

                        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                        new ClaimsPrincipal(claimsIdentity), properties);

                        return RedirectToAction("Index", "Home");

                    }
                    ModelState.AddModelError("", "Wrong Email Or Password");
                    return View(loginVM);
                }
                return View(loginVM);
            }
            return View(loginVM);

        }

        public async Task<IActionResult> LogOut()
        {

            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Account");
        }
    }
}
