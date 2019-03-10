import { Component, OnInit, Inject } from "@angular/core";
import { Dialog } from "../../DialogComponent.abastract";
import { User } from "src/app/enteties/User";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserProvider } from "src/app/services/user-services/user-provider.abstract";

@Component({
  selector: "app-delete-user-dialog",
  templateUrl: "./delete-user-dialog.component.html",
  styleUrls: ["./delete-user-dialog.component.css"]
})
export class DeleteUserDialogComponent extends Dialog<User> {
  constructor(
    protected dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    protected userDataService: UserProvider,
    @Inject(MAT_DIALOG_DATA) protected data: User[]
  ) {
    super(dialogRef, userDataService);
  }

  onConfirm(): void {
    this.userDataService
      .deleteData(this.data)
      .subscribe(() => this.dialogRef.close(1));
  }
}
