import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DeleteProfessorDialogComponent } from "./delete-professor-dialog.component";

describe("DeleteProfessorDialogComponent", () => {
  let component: DeleteProfessorDialogComponent;
  let fixture: ComponentFixture<DeleteProfessorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteProfessorDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProfessorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
