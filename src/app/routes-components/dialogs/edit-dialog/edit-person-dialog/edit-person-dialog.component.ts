import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup } from "@angular/forms";
import { Person } from "src/app/enteties/Person";
import phoneMask from "src/app/constants/masks/phone-mask";
import { PersonProvider } from "src/app/services/person-services/person-provider.abstract";
import { PersonValidatorService } from "src/app/services/validator-services/person-validator/person-validator.service";
import { Dialog } from "../../DialogComponent.abastract";
import { EditDialogComponent } from "../../editDialogComponent";

@Component({
  selector: "app-edit-person-dialog",
  templateUrl: "./edit-person-dialog.component.html",
  styleUrls: ["./edit-person-dialog.component.css"]
})
export class EditPersonDialogComponent extends EditDialogComponent<Person> {
  public phoneMask = phoneMask;

  constructor(
    protected dialogRef: MatDialogRef<EditPersonDialogComponent>,
    protected personService: PersonProvider,
    protected validator: PersonValidatorService,
    @Inject(MAT_DIALOG_DATA) public person: Person
  ) {
    super(dialogRef, personService, validator, person);
  }

  ngOnInit() {
    this.formGroup = this.validator.populateInitalFormValuesWithData(
      this.dataObject
    );
  }
}
