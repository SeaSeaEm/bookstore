import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";

// Book Service
import { BookService } from "../services/BookService.service";

// Book Component
import { BookListComponent } from "./book/home/book.list.component";
//import { BookViewComponent } from "../book/detail/book.detail.component";
import { BookComponent } from "./book/create-edit/book.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    BookListComponent,
    //BookViewComponent,
    BookComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "counter", component: CounterComponent },
      { path: "fetch-data", component: FetchDataComponent },
      { path: "books", component: BookListComponent },
      //{ path: "books/detail/:id", component: BookViewComponent },
      { path: "books/new", component: BookComponent },
      { path: "books/:id", component: BookComponent }
    ])
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
