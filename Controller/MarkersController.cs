using Microsoft.AspNetCore.Mvc;
using NapMap.Models;
using System.Linq;

namespace NapMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MarkersController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public MarkersController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllMarkers()
        {
            var markers = _dbContext.Markers.ToList();
            return Ok(markers);
        }

        [HttpPost]
        public IActionResult AddMarker([FromBody] Marker marker)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _dbContext.Markers.Add(marker);
            _dbContext.SaveChanges();

            return Ok();
        }
    }
}
