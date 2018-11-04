import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup } from "@angular/forms";
import { Person } from "src/app/enteties/Person";
import phoneMask from "src/app/constants/masks/phone-mask";
import { PersonProvider } from "src/app/services/person-services/person-provider.abstract";
import { PersonValidatorService } from "src/app/services/validator-services/person-validator/person-validator.service";
import { EditDialog } from "../EditDialogComponent.abastract";

@Component({
  selector: "app-edit-person-dialog",
  templateUrl: "./edit-person-dialog.component.html",
  styleUrls: ["./edit-person-dialog.component.css"]
})
export class EditPersonDialogComponent extends EditDialog<Person> {
  public phoneMask = phoneMask;
  constructor(
    protected dialogRef: MatDialogRef<EditPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private person: Person,
    protected personService: PersonProvider,
    protected validator: PersonValidatorService
  ) {
    super(dialogRef, person, personService, validator);
  }
  populateInitalFormValuesWithData(): FormGroup {
    const formGroup = this.validator.getValidator();
    const person: Person = this.person;
    formGroup.setValue({
      id: person.id,
      name: person.name,
      surname: person.surname,
      middleName: person.middleName,
      email: person.email,
      phone: person.phone,
      additionalPhone: person.additionalPhone,
      birthday: person.birthday,
      creationDate: person.creationDate,
      photoId: person.photoId,
      user: person.user
    });
    return formGroup;
  }
}
