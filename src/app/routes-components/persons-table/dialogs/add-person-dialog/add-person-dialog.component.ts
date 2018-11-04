import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { PersonProvider } from "src/app/services/person-services/person-provider.abstract";
import { FormGroup } from "@angular/forms";
import phoneMask from "src/app/constants/masks/phone-mask";
import { PersonValidatorService } from "src/app/services/validator-services/person-validator/person-validator.service";

@Component({
  selector: "app-add-person-dialog",
  templateUrl: "./add-person-dialog.component.html",
  styleUrls: ["./add-person-dialog.component.css"]
})
export class AddPersonDialogComponent {
  public phoneMask = phoneMask;
  editPersonReactiveForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddPersonDialogComponent>,
    public personProvider: PersonProvider,
    private validator: PersonValidatorService
  ) {
    this.editPersonReactiveForm = validator.getValidator();
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  public onConfirm(): void {
    this.personProvider.addData(
      this.validator.getDataObjectPopulatedWithValues()
    );
  }
}
