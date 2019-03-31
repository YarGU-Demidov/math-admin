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
    professor.scientificTitle = controls.scientificTitle.value;
    professor.mathNetLink = controls.mathNetLink.value;
    professor.graduated = controls.graduated.value;
    professor.termPapers = controls.termPapers.value;
    professor.theses = controls.theses.value;
    return professor;
  }
  populateInitalFormValuesWithData(data: Professor): FormGroup {
    const formGroup = this.getInitialFormGroup();
    formGroup.setValue({
      person: data.person,
      faculty: data.faculty,
      department: data.department,
      description: data.description,
      scientificTitle: data.scientificTitle,
      status: data.status,
      mathNetLink: data.mathNetLink,
      graduated: data.graduated,
      theses: data.theses,
      termPapers: data.termPapers
    });
    return formGroup;
  }
  getInitialFormGroup(): FormGroup {
    const formGroup = this.fb.group({
      person: ["", [this.ValidateObjectWithId]],
      faculty: ["", [Validators.required]],
      department: ["", [Validators.required]],
      description: ["", [Validators.required]],
      scientificTitle: [""],
      mathNetLink: [""],
      status: [""],
      graduated: this.fb.array([this.fb.group({ graduatedInstance: "" })]),
      termPapers: this.fb.array([this.fb.group({ termPaper: "" })]),
      theses: this.fb.array([this.fb.group({ thesis: "" })])
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
