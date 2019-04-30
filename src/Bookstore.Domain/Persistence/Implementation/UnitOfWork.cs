using Bookstore.Domain.Entity;

namespace Bookstore.Domain.Persistence.Implementation
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ContextEntities _context;

        public UnitOfWork(ContextEntities context)
        {
            _context = context;
        }

        public void Complete()
        {
            _context.SaveChanges();
        }
    }
}
