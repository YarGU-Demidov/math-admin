import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Person } from "src/app/enteties/Person";
import { PersonProvider } from "src/app/services/person-services/person-provider.abstract";

@Component({
  selector: "app-delete-person-dialog",
  templateUrl: "./delete-person-dialog.component.html",
  styleUrls: ["./delete-person-dialog.component.css"]
})
export class DeletePersonDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletePersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person,
    public personDataService: PersonProvider
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.personDataService.deleteData(this.data.id);
  }
}
