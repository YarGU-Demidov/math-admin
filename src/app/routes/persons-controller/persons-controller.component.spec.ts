import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsControllerComponent } from './persons-controller.component';

describe('PersonsControllerComponent', () => {
  let component: PersonsControllerComponent;
  let fixture: ComponentFixture<PersonsControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
