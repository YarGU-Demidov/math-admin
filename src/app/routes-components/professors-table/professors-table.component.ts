import { Component, OnInit } from "@angular/core";
import { Professor } from "src/app/enteties/Professor";
import { DataTableWithSelection } from "src/app/services/tables/DataTableWithSelection";

@Component({
  selector: "app-professors-table",
  templateUrl: "./professors-table.component.html",
  styleUrls: ["./professors-table.component.css"]
})
export class ProfessorsTableComponent extends DataTableWithSelection<Professor>
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
    this.dataSource.loadUsers();

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
}
