import { Injectable } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Person } from "src/app/enteties/Person";
import { ValidatorService } from "../ValidatorSevice.interface";

@Injectable({
  providedIn: "root"
})
export class PersonValidatorService implements ValidatorService<Person> {
  constructor(private fb: FormBuilder) {}
  getDataObjectPopulatedWithValues(formGroup: FormGroup) {
    const controls = formGroup.controls;
    let person = new Person();
    person.name = controls.name.value;
    person.surname = controls.surname.value;
    person.middleName = controls.middleName.value;
    person.email = controls.email.value;
    person.phone = controls.phone.value.replace(/[^0-9+]+/g, "");
    person.additionalPhone = controls.phone.value.replace(/[^0-9+]+/g, "");
    person.birthday = controls.birthday.value;
    person.id = controls.id.value;
    person.CreationDate = controls.creationDate.value;
    person.photoId = controls.photoId.value;
    return person;
  }

  populateInitalFormValuesWithData(person: Person): FormGroup {
    const formGroup = this.getInitialFormGroup();
    formGroup.setValue({
      id: person.id,
      name: person.name,
      surname: person.surname,
      middleName: person.middleName,
      email: person.email,
      phone: person.phone,
      additionalPhone: person.additionalPhone,
      birthday: person.birthday,
      creationDate: person.CreationDate,
      photoId: person.photoId,
      user: person.user
    });
    return formGroup;
  }
  getInitialFormGroup() {
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
      birthday: ["", Validators.required],
      id: [""],
      user: [""],
      creationDate: [""],
      photoId: [""]
    });
  }
}
