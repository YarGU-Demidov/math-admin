import { Component, OnInit } from "@angular/core";
import { Person } from "../../enteties/person";
import { FormGroup } from "@angular/forms";
import { PersonValidatorService } from "src/app/services/person-validator/person-validator.service";
import phoneMask from "../../constants/masks/phone-mask";
import { PersonInMemoryDataProviderService } from "src/app/services/person-services/person-in-memory-data-provider/person-in-memory-data-provider.service";

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
    private personsProvider: PersonInMemoryDataProviderService
  ) {}

  public ngOnInit(): void {
    this.addPersonReactiveForm = this.personValidatorService.getPersonValidators();
  }
  onSubmit() {
    const controls = this.addPersonReactiveForm.controls;

    if (this.addPersonReactiveForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    const person = this.personValidatorService.getPersonPapulatedWithValues(
      this.addPersonReactiveForm.controls
    );
    this.personsProvider.addPreson(person);
  }
}
