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

        [HttpPost]
        public IActionResult DeleteMarker(int id)
        {
            var marker = _dbContext.Markers.Find(id);
            if (marker != null)
            {
                _dbContext.Markers.Remove(marker);
                _dbContext.SaveChanges();
            }
            return RedirectToAction("MarkersTable");
        }

        [HttpPost]
        public IActionResult EditMarker(Marker model)
        {
            var marker = _dbContext.Markers.Find(model.Id);
            if (marker != null)
            {
                marker.Title = model.Title;
                marker.Latitude = model.Latitude;
                marker.Longitude = model.Longitude;
                _dbContext.SaveChanges();
            }
            return RedirectToAction("MarkersTable");
        }

    }
}
