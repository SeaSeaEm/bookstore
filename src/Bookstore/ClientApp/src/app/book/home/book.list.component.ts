import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { BookService } from "../../../services/BookService.service";
import Book = require("../../../model/book");
import IBook = Book.IBook;

@Component({
  selector: "book",
  templateUrl: "./book.list.component.html"
})
export class BookListComponent implements OnInit {
  books: IBook[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService) { }

  ngOnInit() {
    this.loadBooks();
  }

  private loadBooks() {
    this.bookService.getAll()
      .subscribe(books => {
        this.books = books;
      });
  }

  new() {
    this.router.navigate(["/books/new"]);
  }

  edit(id: number) {
    this.router.navigate([`/books/${id}`]);
  }

  delete(id: number) {
    if (confirm("Are you sure ?")) {
      this.bookService.delete(id)
        .subscribe(data => {
          alert("Book successfully deleted.");
          this.loadBooks();
        });
    }
  }
}
