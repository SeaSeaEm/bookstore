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
              this.router.navigate(["/books"]);
            }
          });
    } else {
      this.book.arriveDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
      this.book.publishDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    }
  }

  submit() {
    const valid = this.validateDate();

    if (!valid) {
      alert("Arrived date is invalid for selected publish date. Or selected year is beyond the current year.");
      return;
    }

    if (this.id) {
      this.bookService.update(this.book)
        .subscribe(data => {
          alert("Book successfully updated.");
          this.router.navigate(["/books"]);
        });
    } else if (!this.id) {
      this.bookService.create(this.book)
        .subscribe(data => {
          alert("Book successfully created.");
          this.router.navigate(["/books"]);
        });
    }

  }

  private validateDate(): boolean {
    let valid = true;

    const arrivedYear = this.book.arriveDate.slice(0, 4);
    const arrivedMonth = this.book.arriveDate.slice(5, 7);
    const arrivedDay = this.book.arriveDate.slice(8, 10);

    const publishedYear = this.book.publishDate.slice(0, 4);
    const publishedMonth = this.book.publishDate.slice(5, 7);
    const publishedDay = this.book.publishDate.slice(8, 10);

    const date = new Date();
    const invalidYear = parseInt(arrivedYear) > date.getFullYear() || parseInt(publishedYear) > date.getFullYear();

    if (invalidYear) {
      // Validate if the selected date is beyond the selected
      valid = false;
    } else if (parseInt(publishedMonth) > date.getMonth() && parseInt(publishedYear) >= date.getFullYear() ||
      parseInt(arrivedMonth) > date.getMonth() && parseInt(arrivedYear) >= date.getFullYear()) {
      // Validate if the month is beyond the selected
      valid = false;
    } else if (parseInt(publishedDay) > date.getDay() && parseInt(publishedMonth) > date.getMonth() && parseInt(publishedYear) >= date.getFullYear() ||
      parseInt(arrivedDay) > date.getDay() && parseInt(arrivedMonth) > date.getMonth() && parseInt(arrivedYear) >= date.getFullYear()) {
      // Validate if the day is beyond the selected
      valid = false;
    } else if (publishedYear > arrivedYear) {
      valid = false;
    } else if (publishedYear === arrivedYear &&
      publishedMonth > arrivedMonth) {
      valid = false;
    } else if (publishedYear === arrivedYear &&
      publishedMonth === arrivedMonth &&
      publishedDay > arrivedDay) {
      valid = false;
    }

    return valid;
  }

  delete() {
    if (confirm("Are you sure ?")) {
      this.bookService.delete(this.id)
        .subscribe(data => {
          alert("Book successfully deleted.");
          this.router.navigate(["/books"]);
        });
    }
  }
}
