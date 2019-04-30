using Bookstore.Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace Bookstore.Domain.Entity
{
    public class ContextEntities : DbContext
    {
        public DbSet<Book> Book { get; set; }

        public ContextEntities(DbContextOptions options)
            : base(options)
        {
        }
    }
}
