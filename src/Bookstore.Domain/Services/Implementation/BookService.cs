using System.Collections.Generic;
using System.Threading.Tasks;

using Bookstore.Domain.Model;
using Bookstore.Domain.Repository;

namespace Bookstore.Domain.Services.Implementation
{
    public class BookService : IBookService
    {
        private readonly IRepository<Book> _iBookRepository;

        public BookService(IRepository<Book> iBookRepository)
        {
            _iBookRepository = iBookRepository;
        }

        public async Task<IList<Book>> GetAll()
        {
            return await _iBookRepository.GetAll();
        }

        public Book Get(int id)
        {
            return _iBookRepository.Get(a => a.Id == id);
        }

        public void Insert(Book book)
        {
            _iBookRepository.Insert(book);
        }

        public void Update(Book book)
        {
            _iBookRepository.Update(book);
        }

        public void Delete(Book book)
        {
            _iBookRepository.Delete(book);
        }
    }
}
