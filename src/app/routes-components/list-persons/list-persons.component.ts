import { Component, OnInit, ViewChild } from "@angular/core";

import { Person } from "src/app/enteties/person";
import { PersonValidatorService } from "src/app/services/person-validator/person-validator.service";
import { MatPaginator } from "@angular/material/paginator";
import { tap } from "rxjs/operators";
import { merge, fromEvent } from "rxjs";
import { MatSort, MatDialog } from "@angular/material";
import { FormGroup } from "@angular/forms";
import { PersonDataSource } from "src/app/classes/PersonDataSource";
import { PersonInMemoryDataProviderService } from "src/app/services/person-services/person-in-memory-data-provider/person-in-memory-data-provider.service";
import { HttpClient } from "@angular/common/http";
import { EditPersonDialogComponent } from "../dialogs/edit-person-dialog/edit-person-dialog.component";

@Component({
  selector: "app-list-persons",
  templateUrl: "./list-persons.component.html",
  styleUrls: ["./list-persons.component.css", "./person-list.component.scss"],
  providers: [HttpClient]
})
export class ListPersonsComponent implements OnInit {
  columnsToDisplay: string[] = [
    "name",
    "surname",
    "middleName",
    "email",
    "phone",
    "additionalPhone",
    "birthday",
    "actionsColumn"
  ];

  addPersonReactiveForm: FormGroup;
  dataSource: PersonDataSource;
  totalNumberOfPersons: number;
  personsList: Person[];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private personsProvider: PersonInMemoryDataProviderService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSource = new PersonDataSource(
      this.personsProvider,
      this.paginator,
      this.sort
    );
    this.dataSource.loadPersons();
  }
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.dataSource.loadPersons()))
      .subscribe();
  }

  startEdit(row: any) {
    const dialogRef = this.dialog.open(EditPersonDialogComponent, {
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataSource.loadPersons();
      }
    });
  }
}
