import { Professor } from "src/app/enteties/Professor";
import { Injectable } from "@angular/core";
import { ValidatorService } from "./ValidatorSevice.interface";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class ProfessorValidator implements ValidatorService<Professor> {
  constructor(private fb: FormBuilder) {}

  getDataObjectPopulatedWithValues(formGroup: FormGroup): Professor {
    const controls = formGroup.controls;
    let professor = new Professor();
    professor.person = controls.person.value;
    professor.faculty = controls.faculty.value;
    professor.department = controls.department.value;
    professor.description = controls.description.value;
    return professor;
  }
  populateInitalFormValuesWithData(data: Professor): FormGroup {
    const formGroup = this.getInitialFormGroup();
    formGroup.setValue({
      person: data.person,
      faculty: data.faculty,
      department: data.department,
      description: data.description
    });
    return formGroup;
  }
  getInitialFormGroup(): FormGroup {
    const formGroup = this.fb.group({
      person: ["", [this.ValidateObjectWithId]],
      faculty: ["", [Validators.required]],
      department: ["", [Validators.required]],
      description: ["", [Validators.required]]
    });
    formGroup.controls.person.valueChanges.subscribe(data => {
      if (data) {
        if (!data.set)
          formGroup.get("person").setValue({
            ...data,
            set: true,
            toString: () => {
              if (data && data.name && data.surname) {
                return data.surname + " " + data.name;
              }
              return data;
            }
          });
      }
    });
    return formGroup;
  }

  ValidateObjectWithId(control: FormControl) {
    if (!control.value || !control.value.id) {
      return { valid: false };
    }
    return null;
  }
}
