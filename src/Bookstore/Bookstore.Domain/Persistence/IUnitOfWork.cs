namespace Bookstore.Domain.Persistence
{
    public interface IUnitOfWork
    {
        void Complete();
    }
}
