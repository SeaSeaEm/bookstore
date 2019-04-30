using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Bookstore.Domain.Model;
using Bookstore.Domain.Persistence;
using Bookstore.Domain.Services;

using Microsoft.AspNetCore.Mvc;

namespace Bookstore.Application.Controllers
{
    //[Route("api/[controller]")]
    public class BookController : Controller
    {
        private readonly IBookService _iBookService;
        private readonly IUnitOfWork _iUnitOfWork;

        public BookController(IBookService iBookService, IUnitOfWork iUnitOfWork)
        {
            _iBookService = iBookService;
            _iUnitOfWork = iUnitOfWork;
        }

        [HttpGet]
        public async Task<IList<Book>> GetAll()
        {
            var books = await _iBookService.GetAll();

            return books.OrderBy(b => b.Title).ToList();
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            var books = _iBookService.Get(id);

            if (books == null)
                return BadRequest(ModelState);

            return Ok(books);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Book book)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _iBookService.Insert(book);
            _iUnitOfWork.Complete();

            return Ok();
        }

        [HttpPut]
        public IActionResult Update([FromBody] Book book)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _iBookService.Update(book);
            _iUnitOfWork.Complete();

            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var book = _iBookService.Get(id);

            _iBookService.Delete(book);
            _iUnitOfWork.Complete();

            return Ok();
        }
    }
}