import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { PersonProvider } from "src/app/services/person-services/person-provider.abstract";
import phoneMask from "src/app/constants/masks/phone-mask";
import { PersonValidatorService } from "src/app/services/validator-services/person-validator/person-validator.service";
import { Dialog } from "src/app/routes-components/dialogs/DialogComponent.abastract";
import { Person } from "src/app/enteties/Person";
import { AddDialogComponent } from "../../addDialogComponent";

@Component({
  selector: "app-add-person-dialog",
  templateUrl: "./add-person-dialog.component.html",
  styleUrls: ["./add-person-dialog.component.css"]
})
export class AddPersonDialogComponent extends AddDialogComponent<Person> {
  public phoneMask = phoneMask;
  constructor(
    protected dialogRef: MatDialogRef<AddPersonDialogComponent>,
    protected personProvider: PersonProvider,
    protected validator: PersonValidatorService
  ) {
    super(dialogRef, personProvider, validator);
  }
  ngOnInit() {
    this.formGroup = this.validator.getInitialFormGroup();
  }
}
