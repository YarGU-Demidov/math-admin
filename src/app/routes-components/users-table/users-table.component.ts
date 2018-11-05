import { Component, OnInit, ViewChild } from "@angular/core";
import { UserDataSource } from "src/app/dataSources/UserDataSource";
import { UserProvider } from "src/app/services/user-services/user-provider.abstract";
import { MatPaginator, MatSort, MatDialog } from "@angular/material";
import { User } from "src/app/enteties/User";
import { SelectionModel } from "@angular/cdk/collections";
import { merge } from "rxjs";
import { DeleteUserDialogComponent } from "../dialogs/delete-dialog/delete-user-dialog/delete-user-dialog.component";
import { EditUserDialogComponent } from "../dialogs/edit-dialog/edit-user-dialog/edit-user-dialog.component";

@Component({
  selector: "app-users-table",
  templateUrl: "./users-table.component.html",
  styleUrls: ["./users-table.component.css"]
})
export class UsersTableComponent implements OnInit {
  columnsToDisplay: string[] = [
    "select",
    "login",
    "snm",
    "creationDate",
    "actionsColumn"
  ];
  selection = new SelectionModel<User>(true, []);
  dataSource: UserDataSource;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private userProvider: UserProvider, private dialog: MatDialog) {}
  ngOnInit() {
    this.dataSource = new UserDataSource(
      this.userProvider,
      this.paginator,
      this.sort
    );
    this.dataSource.loadPersons();
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page).subscribe(() =>
      this.dataSource.loadPersons()
    );
  }
  deleteUser() {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: this.selection.selected
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataSource.loadPersons();
        this.selection.clear();
      }
    });
  }
  editUser(user: User) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataSource.loadPersons();
      }
    });
  }
}
