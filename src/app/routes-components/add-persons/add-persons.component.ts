import { Component, OnInit, Output } from "@angular/core";
import { Person } from "../../enteties/person";
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup
} from "@angular/forms";
import { PhoneNumberParserService } from "src/app/services/phone-number-parser/phone-number-parser.service";
import { PersonDataProviderService } from "src/app/services/persons-data-provider/person-data-provider.service";
import { PersonValidatorService } from "src/app/services/person-validator/person-validator.service";

@Component({
  selector: "app-add-persons",
  templateUrl: "./add-persons.component.html",
  styleUrls: ["./add-persons.component.css"]
})
export class AddPersonsComponent implements OnInit {
  @Output()
  public currentPerson: Person;

  addPersonReactiveForm: FormGroup;

  public phoneMask = [
    "+",
    "7",
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/
  ];

  public constructor(
    private personValidatorService: PersonValidatorService,
    private phoneParser: PhoneNumberParserService,
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
    person.phone = this.phoneParser.parse(controls.phone.value);
    person.additionalPhone = this.phoneParser.parse(controls.phone.value);
    person.birthday = controls.birthday.value;

    this.personsProvider.addPreson(person);
    console.log(this.personsProvider.getPersons());
  }
}
