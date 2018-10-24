import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Person } from "src/app/enteties/person";
import { PersonInMemoryDataProviderService } from "src/app/services/person-services/person-in-memory-data-provider/person-in-memory-data-provider.service";

@Component({
  selector: "app-delete-person-dialog",
  templateUrl: "./delete-person-dialog.component.html",
  styleUrls: ["./delete-person-dialog.component.css"]
})
export class DeletePersonDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletePersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person,
    public personDataService: PersonInMemoryDataProviderService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.personDataService.deletePerson(this.data.id);
  }
}
