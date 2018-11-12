import { Injectable } from "@angular/core";
import { ValidatorService } from "../ValidatorSevice.interface";
import { User } from "src/app/enteties/User";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class UserValidatorService implements ValidatorService<User> {
  formGroup: FormGroup;
  getDataObjectPopulatedWithValues(): User {
    const controls = this.formGroup.controls;
    let user = new User();
    user.login = controls.login.value;
    user.password = controls.password.value;
    user.personId = controls.personId.value;
    user.groupId = controls.groupId.value;
    user.creationDate = controls.creationDate.value;
    user.person = controls.person.value;
    return user;
  }
  populateInitalFormValuesWithData(data: User) {
    this.formGroup.setValue({
      login: data.login,
      password: data.password,
      personId: data.personId,
      groupId: data.groupId,
      creationDate: data.creationDate,
      person: data.person,
      personName:
        data.person === null ? "" : `${data.person.surname} ${data.person.name}`
    });
  }

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      login: ["", Validators.required],
      password: ["", Validators.required],
      personId: [""],
      groupId: ["", Validators.required],
      creationDate: [""],
      person: this.fb.control({}),
      personName: ["", Validators.required]
    });
  }
}
