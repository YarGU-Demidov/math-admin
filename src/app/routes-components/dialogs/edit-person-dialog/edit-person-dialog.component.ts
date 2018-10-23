import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { PersonInMemoryDataProviderService } from "src/app/services/person-services/person-in-memory-data-provider/person-in-memory-data-provider.service";
import { PersonValidatorService } from "src/app/services/person-validator/person-validator.service";
import { FormGroup } from "@angular/forms";
import { Person } from "src/app/enteties/person";

@Component({
  selector: "app-edit-person-dialog",
  templateUrl: "./edit-person-dialog.component.html",
  styleUrls: ["./edit-person-dialog.component.css"]
})
export class EditPersonDialogComponent {
  editPersonReactiveForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public person: any,
    public personService: PersonInMemoryDataProviderService,
    private validator: PersonValidatorService
  ) {}

  ngOnInit() {
    this.editPersonReactiveForm = this.populateInitalFormValuesWithData();
  }
  populateInitalFormValuesWithData(): FormGroup {
    const formGroup = this.validator.getPersonValidators();
    const person: Person = this.person;
    formGroup.setValue({
      name: person.name,
      surname: person.surname,
      middleName: person.middleName,
      email: person.email,
      phone: person.phone,
      additionalPhone: person.additionalPhone,
      birthday: person.birthday
    });
    return formGroup;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  stopEdit(): void {
    const person = this.validator.getPersonPapulatedWithValues(
      this.editPersonReactiveForm.controls
    );
    this.personService.editPerson(person);
  }
}
