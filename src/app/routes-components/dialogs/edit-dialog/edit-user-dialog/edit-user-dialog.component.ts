import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserProvider } from "src/app/services/user-services/user-provider.abstract";
import { User } from "src/app/enteties/User";
import { UserValidatorService } from "src/app/services/validator-services/user-validator/user-validator.service";
import { Dialog } from "../../DialogComponent.abastract";
import { PersonProvider } from "src/app/services/person-services/person-provider.abstract";
import { Person } from "src/app/enteties/Person";
import { map, startWith, debounceTime } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { GroupProvider } from "src/app/services/group-services/GroupProvider.abstract";
import Group from "src/app/enteties/Group";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-edit-user-dialog",
  templateUrl: "./edit-user-dialog.component.html",
  styleUrls: ["./edit-user-dialog.component.css"]
})
export class EditUserDialogComponent extends Dialog<User> {
  private persons: Observable<Person[]>;
  private groups: Observable<Group[]>;
  constructor(
    private groupProvider: GroupProvider,
    private personProvider: PersonProvider,
    protected dialogRef: MatDialogRef<EditUserDialogComponent>,
    protected dataProvider: UserProvider,
    protected validator: UserValidatorService,
    @Inject(MAT_DIALOG_DATA) protected user: User
  ) {
    super(dialogRef, dataProvider, validator, user);
    this.getInitialData();
  }

  ngOnInit() {
    this.formGroup = this.validator.populateInitalFormValuesWithData(
      this.dataObject
    );
    this.formGroup.controls.login.disable();
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
  onConfirm(): void {
    const data = this.validator.getDataObjectPopulatedWithValues(
      this.formGroup
    );
    this.dataProvider.editData(data).subscribe(() => this.dialogRef.close(1));
  }
}
