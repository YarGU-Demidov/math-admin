import { Component, OnInit, Inject } from "@angular/core";
import { Professor } from "src/app/enteties/Professor";
import { DeleteDialogComponent } from "../../deleteDialogComponent";
import { ProfessorDataProvider } from "src/app/services/professor-services/ProfessorDataProvider";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-delete-professor-dialog",
  templateUrl: "./delete-professor-dialog.component.html",
  styleUrls: ["./delete-professor-dialog.component.css"]
})
export class DeleteProfessorDialogComponent extends DeleteDialogComponent<
  Professor
> {
  constructor(
    protected dialogRef: MatDialogRef<DeleteProfessorDialogComponent>,
    protected personDataService: ProfessorDataProvider,
    @Inject(MAT_DIALOG_DATA) public data: Professor[]
  ) {
    super(dialogRef, personDataService, data);
  }
}
