import { Component, OnInit } from "@angular/core";
import { User } from "src/app/enteties/User";
import { Dialog } from "../../DialogComponent.abastract";
import { MatDialogRef } from "@angular/material";
import { UserProvider } from "src/app/services/user-services/user-provider.abstract";
import { UserValidatorService } from "src/app/services/validator-services/user-validator/user-validator.service";
import { Observable } from "rxjs";
import { Person } from "src/app/enteties/Person";
import { startWith, map } from "rxjs/operators";
import { PersonProvider } from "src/app/services/person-services/person-provider.abstract";

@Component({
  selector: "app-add-user-dialog",
  templateUrl: "./add-user-dialog.component.html",
  styleUrls: ["./add-user-dialog.component.css"]
})
export class AddUserDialogComponent extends Dialog<User> {
  private persons: Person[];
  private filteredPersons: Observable<Person[]>;
  constructor(
    private personProvider: PersonProvider,
    protected dialogRef: MatDialogRef<AddUserDialogComponent>,
    protected dataProvider: UserProvider,
    protected validator: UserValidatorService
  ) {
    super(dialogRef, dataProvider, validator);
    this.updatePersons();
  }
  ngOnInit() {
    this.formGroup = this.validator.getInitialFormGroup();
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
      .getPaged(0, 10)
      .subscribe(data => (this.persons = data));
  }
  public onConfirm(): void {
    this.dataProvider.addData(
      this.validator.getDataObjectPopulatedWithValues(this.formGroup)
    );
  }
}
