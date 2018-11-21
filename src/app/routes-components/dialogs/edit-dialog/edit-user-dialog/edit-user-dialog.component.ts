import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserProvider } from "src/app/services/user-services/user-provider.abstract";
import { User } from "src/app/enteties/User";
import { UserValidatorService } from "src/app/services/validator-services/user-validator/user-validator.service";
import { Dialog } from "../../DialogComponent.abastract";
import { PersonProvider } from "src/app/services/person-services/person-provider.abstract";
import { Person } from "src/app/enteties/Person";
import { map, startWith } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";

@Component({
  selector: "app-edit-user-dialog",
  templateUrl: "./edit-user-dialog.component.html",
  styleUrls: ["./edit-user-dialog.component.css"]
})
export class EditUserDialogComponent extends Dialog<User> {
  private persons: Person[];
  private filteredPersons: Observable<Person[]>;
  private _person: Person;
  constructor(
    private personProvider: PersonProvider,
    protected dialogRef: MatDialogRef<EditUserDialogComponent>,
    protected userService: UserProvider,
    protected validator: UserValidatorService,
    @Inject(MAT_DIALOG_DATA) protected user: User
  ) {
    super(dialogRef, userService, validator, user);
    this.updatePersons();
  }

  ngOnInit() {
    this.formGroup = this.validator.populateInitalFormValuesWithData(
      this.dataObject
    );

    this.filteredPersons = this.formGroup.controls.person.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
  }
  _filter(value: string | Person): Person[] {
    if (typeof value == "string") {
      const filterValue = value.toLowerCase();
      return this.persons.filter(person => {
        if (!person.isUser) {
          const surnameNameMiddlename = `${person.surname} ${person.name} ${
            person.middleName
          }`;
          return surnameNameMiddlename.toLowerCase().includes(filterValue);
        }
        return false;
      });
    }
  }

  updatePersons() {
    this.personProvider
      .getPersons("name", "asc")
      .subscribe(data => (this.persons = data));
  }

  onConfirm(): void {
    const data = this.validator.getDataObjectPopulatedWithValues(
      this.formGroup
    );
    this.dataProvider.editData(data);
  }
}
