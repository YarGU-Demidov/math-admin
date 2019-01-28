import { Injectable } from "@angular/core";
import { ValidatorService } from "../ValidatorSevice.interface";
import { User } from "src/app/enteties/User";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl
} from "@angular/forms";
import { Person } from "src/app/enteties/Person";

@Injectable({
  providedIn: "root"
})
export class UserValidatorService implements ValidatorService<User> {
  getDataObjectPopulatedWithValues(formGroup: FormGroup): User {
    const controls = formGroup.controls;
    let user = new User();
    user.login = controls.login.value;
    user.password = controls.password.value;
    user.personId = controls.personId.value;
    user.groupId = controls.groupId.value;
    user.creationDate = controls.creationDate.value;
    user.person = controls.person.value;
    return user;
  }
  populateInitalFormValuesWithData(data: User): FormGroup {
    const formGroup = this.getInitialFormGroup();
    formGroup.setValue({
      login: data.login,
      password: data.password,
      personId: data.personId,
      groupId: data.groupId,
      creationDate: data.creationDate,
      person: data.person,
      passwordRepeat: data.password
    });
    return formGroup;
  }
  getInitialFormGroup() {
    const formGroup = this.fb.group(
      {
        login: ["", Validators.required],
        password: ["", Validators.required],
        passwordRepeat: ["", Validators.required],
        personId: [""],
        groupId: ["", Validators.required],
        creationDate: [""],
        person: ["", [ValidatePerson]]
      },
      { validator: PasswordsMatch }
    );
    formGroup.controls.person.valueChanges.subscribe(data => {
      if (data) {
        if (!data.set)
          formGroup.get("person").setValue({
            ...data,
            set: true,
            toString: () => {
              if (
                data !== null &&
                data.name !== undefined &&
                data.surname !== undefined
              ) {
                return data.name + " " + data.surname;
              }
              return data;
            }
          });
      }
    });
    return formGroup;
  }
  constructor(private fb: FormBuilder) {}
}
function ValidatePerson(control: FormControl) {
  if (!control.value || !control.value.id) {
    return { valid: false };
  }
  return null;
}
function PasswordsMatch(group: FormGroup) {
  if (!group.controls.password.value || !group.controls.passwordRepeat.value) {
    return { valid: false };
  }
  if (group.controls.password.value !== group.controls.passwordRepeat.value) {
    group.controls.password.setErrors({ invalid: true });
    group.controls.passwordRepeat.setErrors({ invalid: true });
    return { valid: false };
  }
  group.controls.password.setErrors(null);
  group.controls.passwordRepeat.setErrors(null);
  return null;
}
