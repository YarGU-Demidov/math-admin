import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProfessorValidator } from "src/app/services/validator-services/ProfessorValidator";
import { FormGroup, FormArray, FormBuilder } from "@angular/forms";
import { ProfessorDataProvider } from "src/app/services/professor-services/ProfessorDataProvider";
import { Professor } from "src/app/enteties/Professor";
import { BehaviorSubject } from "rxjs";
import config from "src/app/utils/textEditor.config";

@Component({
  selector: "app-edit-professor",
  templateUrl: "./edit-professor.component.html",
  styleUrls: ["./edit-professor.component.css"]
})
export class EditProfessorComponent implements OnInit {
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  textEditorConfig = config;
  protected isFormReady: boolean;
  formGroup: FormGroup;
  professorId: string;
  constructor(
    private route: ActivatedRoute,
    protected validator: ProfessorValidator,
    protected professorProvider: ProfessorDataProvider,
    private fb: FormBuilder
  ) {
    this.isFormReady = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.professorId = params["id"];
    });
    this.loadingSubject.next(true);
    this.professorProvider.getById(this.professorId).subscribe(value => {
      this.formGroup = this.validator.populateInitalFormValuesWithData(value);
      this.formGroup.controls.person.disable();
      this.loadingSubject.next(false);
      this.isFormReady = true;
    });
  }

  onConfirm() {
    const professor = this.validator.getDataObjectPopulatedWithValues(
      this.formGroup
    );
    professor["id"] = this.professorId;
    this.loadingSubject.next(true);
    this.professorProvider.editData(professor).subscribe(x => {
      this.loadingSubject.next(false);
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
