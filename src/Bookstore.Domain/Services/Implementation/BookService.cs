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

        public void Insert(Book course)
        {
            _iBookRepository.Insert(course);
        }

        public void Update(Book course)
        {
            _iBookRepository.Update(course);
        }

        public void Delete(Book course)
        {
            _iBookRepository.Delete(course);
        }
    }
}
