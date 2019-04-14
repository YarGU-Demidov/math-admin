import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProfessorValidator } from "src/app/services/validator-services/ProfessorValidator";
import { FormGroup } from "@angular/forms";
import { ProfessorDataProvider } from "src/app/services/professor-services/ProfessorDataProvider";
import { Professor } from "src/app/enteties/Professor";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-edit-professor",
  templateUrl: "./edit-professor.component.html",
  styleUrls: ["./edit-professor.component.css"]
})
export class EditProfessorComponent implements OnInit {
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  protected isFormReady: boolean;
  formGroup: FormGroup;
  professorId: string;
  constructor(
    private route: ActivatedRoute,
    protected validator: ProfessorValidator,
    protected professorProvider: ProfessorDataProvider
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
}
