import { Component, OnInit } from "@angular/core";
import { Professor } from "src/app/enteties/Professor";
import { DataTableWithSelection } from "src/app/services/tables/DataTableWithSelection";
import { UserDataSource } from "src/app/dataSources/UserDataSource";
import { UserProvider } from "src/app/services/user-services/user-provider.abstract";
import { MatDialog } from "@angular/material";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { DeleteUserDialogComponent } from "../dialogs/delete-dialog/delete-user-dialog/delete-user-dialog.component";
import { ProfessorDataSource } from "src/app/dataSources/ProfessorDataSource";
import { ProfessorProvider } from "src/app/services/professor-services/ProfessorProvider";

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
  dataSource: ProfessorDataSource;
  dataProvider: ProfessorProvider;
  constructor(dataProvider: ProfessorProvider, dialog: MatDialog) {
    super(dataProvider, dialog);
  }
  ngOnInit() {
    this.dataSource = new ProfessorDataSource(
      this.dataProvider,
      this.paginator
    );
  }
  ngAfterViewInit() {
    this.dataSource.loadProfessors();

    this.paginator.page.subscribe(() => this.dataSource.loadProfessors());
  }
}
