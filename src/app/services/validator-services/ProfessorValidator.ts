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
    formGroup.setValue({
      person: data.person,
      faculty: data.faculty,
      department: data.department,
      description: data.description,
      scientificTitle: data.scientificTitle,
      status: data.status,
      mathNetLink: data.mathNetLink,
      graduated: data.graduated.map(x => {
        return { graduatedInstance: x };
      }),
      theses: data.theses.map(x => {
        return { termPaper: x };
      }),
      termPapers: data.termPapers.map(x => {
        return { thesis: x };
      }),
      bibliographicIndexOfWorks: data.bibliographicIndexOfWorks.map(x => {
        return { bibliographicIndex: x };
      })
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
