/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { assert } from "chai";
import { BookListComponent } from "./book.list.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";

let fixture: ComponentFixture<BookListComponent>;

describe("Counter component", () => {
    beforeEach(() => {
      TestBed.configureTestingModule({ declarations: [BookListComponent] });
      fixture = TestBed.createComponent(BookListComponent);
        fixture.detectChanges();
    });

    it("should display a title", async(() => {
        const titleText = fixture.nativeElement.querySelector("h1").textContent;
        expect(titleText).toEqual("Manager");
    }));
    
});
