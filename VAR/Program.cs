using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using VAR.Models;
using VAR.Repositries;

namespace VAR
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();
            builder.Services.AddDbContext<VarDbContext>(option => option.UseSqlServer(builder.Configuration.GetConnectionString("default")));

            builder.Services.AddScoped<IAdminRepo, AdminRepo>(); //Ingect IAdminRepo
            builder.Services.AddScoped<IPlaystationRepo, PlaystationRepo>(); //Ingect IPlaystationRepo
            builder.Services.AddScoped<IAuthnticationRepo, AuthnticationRepo>(); //Ingect IAuthnticationRepo
            builder.Services.AddScoped<IItemRepo, ItemRepo>(); //Ingect ItemRepo
            builder.Services.AddScoped<IOrderRepo, OrderRepo>(); //Ingect IOrderRepo
            builder.Services.AddScoped<IOrderItemDetailsRepo, OrderItemDetailsRepo>(); //Ingect IOrderItemDetailsRepo




            builder.Services.AddAuthentication(
                CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(option =>
                {
                    option.LoginPath = "/Account/Login";
                    option.ExpireTimeSpan = TimeSpan.FromMinutes(20);
                });


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Account}/{action=Login}/{id?}");

            app.Run();
        }
    }
}