import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Person } from "src/app/enteties/Person";
import { PersonProvider } from "src/app/services/person-services/person-provider.abstract";
import { Dialog } from "src/app/routes-components/dialogs/DialogComponent.abastract";

@Component({
  selector: "app-delete-person-dialog",
  templateUrl: "./delete-person-dialog.component.html",
  styleUrls: ["./delete-person-dialog.component.css"]
})
export class DeletePersonDialogComponent extends Dialog<Person> {
  constructor(
    protected dialogRef: MatDialogRef<DeletePersonDialogComponent>,
    protected personDataService: PersonProvider,
    @Inject(MAT_DIALOG_DATA) protected data: Person[]
  ) {
    super(dialogRef, personDataService);
  }

  onConfirm(): void {
    this.personDataService.deleteData(this.data);
  }
}
