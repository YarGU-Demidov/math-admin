import { Component, OnInit, Output } from "@angular/core";
import { Person } from "../../enteties/person";
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup
} from "@angular/forms";

@Component({
  selector: "app-add-persons",
  templateUrl: "./add-persons.component.html",
  styleUrls: ["./add-persons.component.css"]
})
export class AddPersonsComponent implements OnInit {
  @Output()
  public currentPerson: Person;

  addPersonReactiveForm: FormGroup;

  public phoneMask = [
    "+",
    "7",
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/
  ];

  public constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.addPersonReactiveForm = this.fb.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      middlename: [""],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required]],
      additionalPhone: [""],
      birthday: new FormControl(new Date().toISOString(), Validators.required)
    });
  }
  onSubmit() {
    const controls = this.addPersonReactiveForm.controls;

    if (this.addPersonReactiveForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    const person = new Person();

    person.name = controls.name.value;
    person.surname = controls.surname.value;
    person.middleName = controls.middlename.value;
    person.email = controls.email.value;
    person.phone = controls.phone.value;
    person.additionalPhone = controls.phone.value;
    person.birthday = controls.birthday.value;
    console.log(person);
  }
}
