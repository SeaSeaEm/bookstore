import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import "rxjs/add/operator/map";

import Book = require("../model/book");
import IBook = Book.IBook;

@Injectable()
export class BookService {
  constructor(private http: Http) { }

  getAll() {
    return this.http.get("/book/getall")
      .map(res => res.json());
  }

  get(id: number) {
    return this.http.get(`/book/get/${id}`)
      .map(res => res.json());
  }

  update(book: IBook) {
    return this.http.put("/book/update", book);
  }

  create(book: IBook) {
    return this.http.post("/book/create", book);
  }

  delete(id: number) {
    return this.http.delete(`/book/delete/${id}`);
  }
}
