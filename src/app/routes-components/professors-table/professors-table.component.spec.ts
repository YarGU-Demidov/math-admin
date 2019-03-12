import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProfessorsTableComponent } from "./professors-table.component";

describe("ProfessorsTableComponent", () => {
  let component: ProfessorsTableComponent;
  let fixture: ComponentFixture<ProfessorsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorsTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
