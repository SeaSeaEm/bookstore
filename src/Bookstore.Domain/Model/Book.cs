using System;
using System.ComponentModel.DataAnnotations;

namespace Bookstore.Domain.Model
{
    public class Book
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Author { get; set; }

        [Required]
        public DateTime PublishDate { get; set; }

        [Required]
        public DateTime ArriveDate { get; set; }

        [Required]
        public string Genres { get; set; }

        public string Shelf { get; set; }

        public int Quantity { get; set; }

    }
}
