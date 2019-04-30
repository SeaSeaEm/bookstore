import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DatePipe } from "@angular/common";

import { BookService } from "../../../services/BookService.service";
import { IBook } from "../../../model/book";

@Component({
  selector: "book",
  templateUrl: "./book.component.html"
})
export class BookComponent implements OnInit {
  book: IBook = {
    id: 0,
    title: "",
    author: "",
    publishDate: "",
    arriveDate: "",
    genres: "",
    shelf: "",
    quantity: 0
  }

  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private datePipe: DatePipe) {
    route.params.subscribe(p => {
      this.id = +p["id"];
    });
  }

  ngOnInit() {
    if (this.id) {
      this.bookService.get(this.id)
        .subscribe(b => {
          // Fix for invalid date format on calendar
          const arrivedDateFormatted = String(b.arriveDate).slice(0, 10);
          const publishedDateFormatted = String(b.publishDate).slice(0, 10);

          b.arriveDate = arrivedDateFormatted;
          b.publishDate = publishedDateFormatted;

          this.book = b;
        },
          err => {
            alert("Error trying to load book !");

            if (err.status === 404) {
              alert("Page not found :( !");
              this.router.navigate(["/home"]);
            }
          });
    } else {
      this.book.arriveDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
      this.book.publishDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    }
  }

  submit() {
    if (this.id) {
      this.bookService.update(this.book)
        .subscribe(data => {
          alert("Book successfully updated.");
        });
    } else if (!this.id) {
      this.bookService.create(this.book)
        .subscribe(data => {
          alert("Book successfully created.");
        });
    }

    this.router.navigate(["/home"]);
  }

  delete() {
    if (confirm("Are you sure ?")) {
      this.bookService.delete(this.id)
        .subscribe(data => {
          alert("Book successfully deleted.");
        });
    }

    this.router.navigate(["/home"]);
  }
}
