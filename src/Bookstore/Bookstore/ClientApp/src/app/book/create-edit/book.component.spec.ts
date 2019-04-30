/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { assert } from "chai";
import { BookComponent } from "./book.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";

let fixture: ComponentFixture<BookComponent>;

describe("Counter component", () => {
    beforeEach(() => {
      TestBed.configureTestingModule({ declarations: [BookComponent] });
      fixture = TestBed.createComponent(BookComponent);
        fixture.detectChanges();
    });

    it("should display a title", async(() => {
        const titleText = fixture.nativeElement.querySelector("h1").textContent;
        expect(titleText).toEqual("New Book");
    }));
    
});
