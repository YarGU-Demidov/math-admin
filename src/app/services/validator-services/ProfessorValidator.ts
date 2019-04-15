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
    professor.graduated = controls.graduated.value.map(
      x => x.graduatedInstance
    );
    professor.termPapers = controls.termPapers.value.map(x => x.termPaper);
    professor.theses = controls.theses.value.map(x => x.thesis);
    professor.bibliographicIndexOfWorks = controls.bibliographicIndexOfWorks.value.map(
      x => x.bibliographicIndex
    );
    return professor;
  }
  populateInitalFormValuesWithData(data: Professor): FormGroup {
    const formGroup = this.getInitialFormGroup();
    formGroup.patchValue({ person: data.person });
    formGroup.patchValue({ faculty: data.faculty });
    formGroup.patchValue({ department: data.department });
    formGroup.patchValue({ description: data.description });
    formGroup.patchValue({ scientificTitle: data.scientificTitle });
    formGroup.patchValue({ status: data.status });
    formGroup.patchValue({ mathNetLink: data.mathNetLink });
    formGroup.setControl(
      "graduated",
      this.fb.array(
        data.graduated.map(x => {
          return this.fb.group({ graduatedInstance: x });
        }) || []
      )
    );
    formGroup.setControl(
      "theses",
      this.fb.array(
        data.theses.map(x => {
          return this.fb.group({ thesis: x });
        }) || []
      )
    );
    formGroup.setControl(
      "termPapers",
      this.fb.array(
        data.termPapers.map(x => {
          return this.fb.group({ termPaper: x });
        }) || []
      )
    );
    formGroup.setControl(
      "bibliographicIndexOfWorks",
      this.fb.array(
        data.bibliographicIndexOfWorks.map(x => {
          return this.fb.group({ bibliographicIndex: x });
        }) || []
      )
    );
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
      theses: this.fb.array([this.fb.group({ thesis: "" })]),
      bibliographicIndexOfWorks: this.fb.array([
        this.fb.group({ bibliographicIndex: "" })
      ])
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
