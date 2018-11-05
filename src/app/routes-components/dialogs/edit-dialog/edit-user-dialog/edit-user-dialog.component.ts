import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserProvider } from "src/app/services/user-services/user-provider.abstract";
import { User } from "src/app/enteties/User";
import { UserValidatorService } from "src/app/services/validator-services/user-validator/user-validator.service";
import { Dialog } from "../../DialogComponent.abastract";

@Component({
  selector: "app-edit-user-dialog",
  templateUrl: "./edit-user-dialog.component.html",
  styleUrls: ["./edit-user-dialog.component.css"]
})
export class EditUserDialogComponent extends Dialog<User> {
  constructor(
    protected dialogRef: MatDialogRef<EditUserDialogComponent>,
    protected userService: UserProvider,
    protected validator: UserValidatorService,
    @Inject(MAT_DIALOG_DATA) protected user: User
  ) {
    super(dialogRef, userService, validator, user);
  }

  ngOnInit() {
    this.validator.populateInitalFormValuesWithData(this.dataObject);
    this.formGroup = this.validator.formGroup;
  }

  onConfirm(): void {
    const data = this.validator.getDataObjectPopulatedWithValues();
    this.dataProvider.editData(data);
  }
}
