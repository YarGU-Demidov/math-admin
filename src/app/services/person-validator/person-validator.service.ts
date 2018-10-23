import { Injectable } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from "@angular/forms";
import { Person } from "src/app/enteties/person";

@Injectable({
  providedIn: "root"
})
export class PersonValidatorService {
  constructor(private fb: FormBuilder) {}
  getPersonValidators(): FormGroup {
    return this.fb.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      middleName: [""],
      email: ["", [Validators.required, Validators.email]],
      phone: [
        "",
        [
          Validators.required,
          Validators.pattern("\\+7 \\([0-9]{3}\\) [0-9]{3} [0-9]{2} [0-9]{2}")
        ]
      ],
      additionalPhone: [""],
      birthday: ["", Validators.required]
    });
  }
  getPersonPapulatedWithValues(controls: { [key: string]: AbstractControl }) {
    let person = new Person();
    person.name = controls.name.value;
    person.surname = controls.surname.value;
    person.middleName = controls.middlename.value;
    person.email = controls.email.value;
    person.phone = controls.phone.value.replace(/[^0-9+]+/g, "");
    person.additionalPhone = controls.phone.value.replace(/[^0-9+]+/g, "");
    person.birthday = controls.birthday.value;
    return person;
  }
}
