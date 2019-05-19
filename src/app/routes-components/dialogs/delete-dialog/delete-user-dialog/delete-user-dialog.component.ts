import { Component, OnInit, Inject } from "@angular/core";
import { Dialog } from "../../DialogComponent.abastract";
import { User } from "src/app/enteties/User";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserProvider } from "src/app/services/user-services/user-provider.abstract";
import { DeleteDialogComponent } from "../../deleteDialogComponent";

@Component({
  selector: "app-delete-user-dialog",
  templateUrl: "./delete-user-dialog.component.html",
  styleUrls: ["./delete-user-dialog.component.css"]
})
export class DeleteUserDialogComponent extends DeleteDialogComponent<User> {
  constructor(
    protected dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    protected userDataService: UserProvider,
    @Inject(MAT_DIALOG_DATA) public data: User[]
  ) {
    super(dialogRef, userDataService, data);
  }
}
