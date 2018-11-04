import { Injectable } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Person } from "src/app/enteties/Person";
import { ValidatorService } from "../ValidatorSevice.interface";

@Injectable({
  providedIn: "root"
})
export class PersonValidatorService implements ValidatorService<Person> {
  formGroup: FormGroup;
  constructor(private fb: FormBuilder) {}
  getValidator(): FormGroup {
    if (!this.formGroup) {
      this.formGroup = this.fb.group({
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
        birthday: ["", Validators.required],
        id: [""],
        user: [""],
        creationDate: [""],
        photoId: [""]
      });
    }
    return this.formGroup;
  }
  getDataObjectPopulatedWithValues() {
    const controls = this.formGroup.controls;
    let person = new Person();
    person.name = controls.name.value;
    person.surname = controls.surname.value;
    person.middleName = controls.middleName.value;
    person.email = controls.email.value;
    person.phone = controls.phone.value.replace(/[^0-9+]+/g, "");
    person.additionalPhone = controls.phone.value.replace(/[^0-9+]+/g, "");
    person.birthday = controls.birthday.value;
    person.id = controls.id.value;
    person.creationDate = controls.creationDate.value;
    person.photoId = controls.photoId.value;
    return person;
  }
}
