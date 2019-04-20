import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UserDataSource } from "src/app/dataSources/UserDataSource";
import { UserProvider } from "src/app/services/user-services/user-provider.abstract";
import { MatDialog } from "@angular/material";
import { User } from "src/app/enteties/User";
import { fromEvent } from "rxjs";
import { DeleteUserDialogComponent } from "../dialogs/delete-dialog/delete-user-dialog/delete-user-dialog.component";
import { EditUserDialogComponent } from "../dialogs/edit-dialog/edit-user-dialog/edit-user-dialog.component";
import { AddUserDialogComponent } from "../dialogs/add-dialog/add-user-dialog/add-user-dialog.component";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { DataTableWithSelection } from "src/app/services/tables/DataTableWithSelection";

@Component({
  selector: "app-users-table",
  templateUrl: "./users-table.component.html",
  styleUrls: ["./users-table.component.css"]
})
export class UsersTableComponent extends DataTableWithSelection<User>
  implements OnInit {
  columnsToDisplay: string[] = [
    "select",
    "login",
    "snm",
    "creationDate",
    "actionsColumn"
  ];
  @ViewChild("filterLogin")
  filterLogin: ElementRef;
  dataSource: UserDataSource;
  dataProvider: UserProvider;
  constructor(userProvider: UserProvider, dialog: MatDialog) {
    super(userProvider, dialog);
  }
  ngOnInit() {
    this.dataSource = new UserDataSource(this.dataProvider, this.paginator);
  }
  ngAfterViewInit() {
    setTimeout(() => this.dataSource.loadUsers());

    fromEvent(this.filterLogin.nativeElement, "keyup")
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
        })
      )
      .subscribe(() => {
        if (this.filterLogin.nativeElement.value !== "") {
          this.dataSource.loadUsersByLogin(
            this.filterLogin.nativeElement.value
          );
        } else this.dataSource.loadUsers();
      });

    this.paginator.page.subscribe(() => this.dataSource.loadUsers());
  }
  deleteUser() {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: this.selection.selected
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataSource.loadUsers();
      }
      this.selection.clear();
    });
  }
  editUser(user: User) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataSource.loadUsers();
      }
      this.selection.clear();
    });
  }
  addUser() {
    const dialogRef = this.dialog.open(AddUserDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataSource.loadUsers();
      }
      this.selection.clear();
    });
  }
}
