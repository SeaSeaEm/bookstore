using System.Collections.Generic;
using System.Threading.Tasks;

using Bookstore.Domain.Model;

namespace Bookstore.Domain.Services
{
    public interface IBookService
    {
        Task<IList<Book>> GetAll();
        Book Get(int id);
        void Insert(Book course);
        void Update(Book course);
        void Delete(Book id);
    }
}
