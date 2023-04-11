using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace NapMap.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Marker> Markers { get; set; }
    }
}
