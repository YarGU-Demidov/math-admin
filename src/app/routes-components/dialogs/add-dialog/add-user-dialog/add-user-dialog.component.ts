import { Component, OnInit } from "@angular/core";
import { User } from "src/app/enteties/User";
import { Dialog } from "../../DialogComponent.abastract";
import { MatDialogRef } from "@angular/material";
import { UserProvider } from "src/app/services/user-services/user-provider.abstract";
import { UserValidatorService } from "src/app/services/validator-services/user-validator/user-validator.service";
import { Observable } from "rxjs";
import { Person } from "src/app/enteties/Person";
import { startWith, map, debounceTime } from "rxjs/operators";
import { PersonProvider } from "src/app/services/person-services/person-provider.abstract";
import { GroupProvider } from "src/app/services/group-services/GroupProvider.abstract";
import Group from "src/app/enteties/Group";
import { persons } from "src/app/api-endpoints/methodNames";
import { AddDialogComponent } from "../../addDialogComponent";

@Component({
  selector: "app-add-user-dialog",
  templateUrl: "./add-user-dialog.component.html",
  styleUrls: ["./add-user-dialog.component.css"]
})
export class AddUserDialogComponent extends AddDialogComponent<User> {
  public persons: Observable<Person[]>;
  public groups: Observable<Group[]>;
  constructor(
    private groupProvider: GroupProvider,
    private personProvider: PersonProvider,
    protected dialogRef: MatDialogRef<AddUserDialogComponent>,
    protected dataProvider: UserProvider,
    protected validator: UserValidatorService
  ) {
    super(dialogRef, dataProvider, validator);
    this.getInitialData();
  }
  ngOnInit() {
    this.formGroup = this.validator.getInitialFormGroup();

    this.formGroup.controls.person.valueChanges
      .pipe(
        debounceTime(500),
        map(
          value =>
            value !== ""
              ? (value = this.personProvider.getBySurnameWithoutUsers(value))
              : (value = this.personProvider.getAllWithoutUsers())
        )
      )
      .subscribe(value => (this.persons = value));

    this.formGroup.controls.group.valueChanges
      .pipe(
        debounceTime(500),
        map(
          value =>
            value !== ""
              ? (value = this.groupProvider.getGroupsByAlias(value))
              : (value = this.groupProvider.getAll())
        )
      )
      .subscribe(value => (this.groups = value));
  }
  protected getInitialData() {
    this.persons = this.personProvider.getAllWithoutUsers();
    this.groups = this.groupProvider.getAll();
  }
}
