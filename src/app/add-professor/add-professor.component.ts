import { Component, OnInit } from "@angular/core";
import { ProfessorValidator } from "../services/validator-services/ProfessorValidator";
import { ProfessorProvider } from "../services/professor-services/ProfessorProvider";
import { PersonProvider } from "../services/person-services/person-provider.abstract";
import { FormGroup, FormArray, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { Person } from "../enteties/Person";
import { debounceTime, map } from "rxjs/operators";

@Component({
  selector: "app-add-professor",
  templateUrl: "./add-professor.component.html",
  styleUrls: ["./add-professor.component.css"]
})
export class AddProfessorComponent implements OnInit {
  config: any = {
    height: 100,
    theme: "modern",
    // powerpaste advcode toc tinymcespellchecker a11ychecker mediaembed linkchecker help
    plugins:
      "print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor wordcount contextmenu colorpicker textpattern",
    toolbar:
      "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  ",
    image_advtab: true,
    imagetools_toolbar:
      "rotateleft rotateright | flipv fliph | editimage imageoptions",
    content_css: [
      "//fonts.googleapis.com/css?family=Lato:300,300i,400,400i",
      "//www.tinymce.com/css/codepen.min.css"
    ]
  };
  formGroup: FormGroup;
  private persons: Observable<Person[]>;

  constructor(
    protected professorProvider: ProfessorProvider,
    protected personProvider: PersonProvider,
    protected validator: ProfessorValidator,
    private fb: FormBuilder
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
              ? (value = this.personProvider.getBySurname(value))
              : (value = this.personProvider.getAll())
        )
      )
      .subscribe(value => (this.persons = value));
  }

  protected getInitialData() {
    this.persons = this.personProvider.getAll();
  }
  public onConfirm(): void {
    const professor = this.validator.getDataObjectPopulatedWithValues(
      this.formGroup
    );
    this.professorProvider.addData(professor).subscribe();
  }
  get graduated() {
    return this.formGroup.get("graduated") as FormArray;
  }
  get termPapers() {
    return this.formGroup.get("termPapers") as FormArray;
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
}
