import { Component, OnInit } from "@angular/core";
import { Person } from "../../enteties/person";
import { FormGroup } from "@angular/forms";
import { PersonDataProviderService } from "src/app/services/persons-data-provider/person-data-provider.service";
import { PersonValidatorService } from "src/app/services/person-validator/person-validator.service";
import phoneMask from "../../constants/masks/phone-mask";

@Component({
  selector: "app-add-persons",
  templateUrl: "./add-persons.component.html",
  styleUrls: ["./add-persons.component.css"]
})
export class AddPersonsComponent implements OnInit {
  addPersonReactiveForm: FormGroup;

  public phoneMask = phoneMask;

  public constructor(
    private personValidatorService: PersonValidatorService,
    private personsProvider: PersonDataProviderService
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.addPersonReactiveForm = this.personValidatorService.getRowValidator();
  }
  onSubmit() {
    const controls = this.addPersonReactiveForm.controls;

    if (this.addPersonReactiveForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    const person = new Person();

    person.name = controls.name.value;
    person.surname = controls.surname.value;
    person.middleName = controls.middlename.value;
    person.email = controls.email.value;
    person.phone = controls.phone.value.replace(/[^0-9+]+/g, "");
    person.additionalPhone = controls.phone.value.replace(/[^0-9+]+/g, "");
    person.birthday = controls.birthday.value;

    this.personsProvider.addPreson(person);
    console.log(this.personsProvider.getPersons());
  }
}
