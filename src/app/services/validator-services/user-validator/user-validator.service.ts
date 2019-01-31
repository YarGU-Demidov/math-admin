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
  constructor(private fb: FormBuilder) {}
  getDataObjectPopulatedWithValues(formGroup: FormGroup): User {
    const controls = formGroup.controls;
    let user = new User();
    user.Login = controls.login.value;
    user.Password = controls.password.value;
    user.PersonId = controls.personId.value;
    user.Group = controls.group.value;
    user.CreationDate = controls.creationDate.value;
    user.Person = controls.person.value;
    return user;
  }
  populateInitalFormValuesWithData(data: User): FormGroup {
    const formGroup = this.getInitialFormGroup();
    formGroup.setValue({
      login: data.Login,
      password: data.Password,
      personId: data.PersonId,
      group: data.Group,
      creationDate: data.CreationDate,
      person: data.Person,
      passwordRepeat: data.Password
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
        group: ["", ValidateObjectWithId],
        creationDate: [""],
        person: ["", [ValidateObjectWithId]]
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
                return data.surname + " " + data.name;
              }
              return data;
            }
          });
      }
    });
    formGroup.controls.group.valueChanges.subscribe(data => {
      if (data) {
        if (!data.set)
          formGroup.get("group").setValue({
            ...data,
            set: true,
            toString: () => {
              if (data !== null && data.alias !== undefined) {
                return data.alias;
              }
              return data;
            }
          });
      }
    });
    return formGroup;
  }
}
function ValidateObjectWithId(control: FormControl) {
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
