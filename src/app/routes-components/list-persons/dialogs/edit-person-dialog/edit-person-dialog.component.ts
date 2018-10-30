import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { PersonValidatorService } from "src/app/services/person-validator/person-validator.service";
import { FormGroup } from "@angular/forms";
import { Person } from "src/app/enteties/person";
import phoneMask from "src/app/constants/masks/phone-mask";
import { PersonProvider } from "src/app/services/person-services/person-provider.abstract";

@Component({
  selector: "app-edit-person-dialog",
  templateUrl: "./edit-person-dialog.component.html",
  styleUrls: ["./edit-person-dialog.component.css"]
})
export class EditPersonDialogComponent {
  editPersonReactiveForm: FormGroup;

  public phoneMask = phoneMask;
  constructor(
    public dialogRef: MatDialogRef<EditPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public person: any,
    public personService: PersonProvider,
    private validator: PersonValidatorService
  ) {}

  ngOnInit() {
    this.editPersonReactiveForm = this.populateInitalFormValuesWithData();
  }
  populateInitalFormValuesWithData(): FormGroup {
    const formGroup = this.validator.getPersonValidators();
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
      isUser: person.isUser
    });
    return formGroup;
  }
  onCancel(): void {
    this.dialogRef.close();
  }
  onConfirm(): void {
    const person = this.validator.getPersonPapulatedWithValues();
    this.personService.editPerson(person);
  }
}
