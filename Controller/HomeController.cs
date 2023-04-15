using Microsoft.AspNetCore.Mvc;
using NapMap.Models;

namespace NapMap.Controllers
{
    public class HomeController : Controller
    {
        private readonly AppDbContext _dbContext;

        public HomeController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult MarkersTable() 
        { 
            var markers = _dbContext.Markers.ToList();
            return View(markers);
        }
    }
}
