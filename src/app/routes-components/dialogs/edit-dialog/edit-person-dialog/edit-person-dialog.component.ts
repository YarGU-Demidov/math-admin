import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup } from "@angular/forms";
import { Person } from "src/app/enteties/Person";
import phoneMask from "src/app/constants/masks/phone-mask";
import { PersonProvider } from "src/app/services/person-services/person-provider.abstract";
import { PersonValidatorService } from "src/app/services/validator-services/person-validator/person-validator.service";
import { Dialog } from "../../DialogComponent.abastract";

@Component({
  selector: "app-edit-person-dialog",
  templateUrl: "./edit-person-dialog.component.html",
  styleUrls: ["./edit-person-dialog.component.css"]
})
export class EditPersonDialogComponent extends Dialog<Person> {
  private phoneMask = phoneMask;

  constructor(
    protected dialogRef: MatDialogRef<EditPersonDialogComponent>,
    protected personService: PersonProvider,
    protected validator: PersonValidatorService,
    @Inject(MAT_DIALOG_DATA) protected person: Person
  ) {
    super(dialogRef, personService, validator, person);
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
