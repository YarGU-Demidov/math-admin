import { Component, OnInit } from "@angular/core";
import { ProfessorValidator } from "../../services/validator-services/ProfessorValidator";
import { ProfessorDataProvider } from "../../services/professor-services/ProfessorDataProvider";
import { PersonProvider } from "../../services/person-services/person-provider.abstract";
import { FormGroup, FormArray, FormBuilder } from "@angular/forms";
import { Observable, BehaviorSubject } from "rxjs";
import { Person } from "../../enteties/Person";
import { debounceTime, map } from "rxjs/operators";
import config from "src/app/utils/textEditor.config";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-professor",
  templateUrl: "./add-professor.component.html",
  styleUrls: ["./add-professor.component.css"]
})
export class AddProfessorComponent implements OnInit {
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  formGroup: FormGroup;
  private persons: Observable<Person[]>;
  textEditorConfig = config;
  constructor(
    protected professorProvider: ProfessorDataProvider,
    protected personProvider: PersonProvider,
    protected validator: ProfessorValidator,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.getInitialData();
  }

  ngOnInit() {
    this.formGroup = this.validator.getInitialFormGroup();
    this.formGroup.controls.person.valueChanges
      .pipe(
        debounceTime(500),
        map(
          value =>
            value.length > 0
              ? (value = this.personProvider.getBySurnameWithoutProfessors(
                  value
                ))
              : (value = this.personProvider.getAllWithoutProfessors())
        )
      )
      .subscribe(value => (this.persons = value));
  }

  protected getInitialData() {
    this.persons = this.personProvider.getAllWithoutProfessors();
  }
  public onConfirm(): void {
    const professor = this.validator.getDataObjectPopulatedWithValues(
      this.formGroup
    );
    this.loadingSubject.next(true);
    this.professorProvider.addData(professor).subscribe(x => {
      this.loadingSubject.next(false);
      this.router.navigate(["/professors"]);
    });
  }
  get graduated() {
    return this.formGroup.get("graduated") as FormArray;
  }
  get termPapers() {
    return this.formGroup.get("termPapers") as FormArray;
  }
  get bibliographicIndexOfWorks() {
    return this.formGroup.get("bibliographicIndexOfWorks") as FormArray;
  }

  get theses() {
    return this.formGroup.get("theses") as FormArray;
  }

  addGraduatedInstance() {
    this.graduated.push(this.fb.group({ graduatedInstance: "" }));
  }
  deleteGraduatedInstance(index) {
    this.graduated.removeAt(index);
  }

  addTermPaper() {
    this.termPapers.push(this.fb.group({ termPaper: "" }));
  }
  deleteTermPaper(index) {
    this.termPapers.removeAt(index);
  }

  addThesis() {
    this.theses.push(this.fb.group({ thesis: "" }));
  }
  deleteThesis(index) {
    this.theses.removeAt(index);
  }

  addBibliographicIndex() {
    this.bibliographicIndexOfWorks.push(
      this.fb.group({ bibliographicIndex: "" })
    );
  }
  deleteBibliographicIndex(index) {
    this.bibliographicIndexOfWorks.removeAt(index);
  }
}
