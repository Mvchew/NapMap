using Microsoft.AspNetCore.Mvc;

namespace NapMap.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
