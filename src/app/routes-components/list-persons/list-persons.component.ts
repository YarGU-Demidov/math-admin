import { Component, OnInit, ViewChild, Inject } from "@angular/core";

import { Person } from "src/app/enteties/person";
import { MatPaginator } from "@angular/material/paginator";
import { tap } from "rxjs/operators";
import { merge, fromEvent } from "rxjs";
import { MatSort, MatDialog } from "@angular/material";
import { FormGroup } from "@angular/forms";
import { PersonDataSource } from "src/app/classes/PersonDataSource";
import { HttpClient } from "@angular/common/http";
import { EditPersonDialogComponent } from "../list-persons/dialogs/edit-person-dialog/edit-person-dialog.component";
import { DeletePersonDialogComponent } from "./dialogs/delete-person-dialog/delete-person-dialog.component";
import { PersonProvider } from "src/app/services/person-services/person-provider.abstract";

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
    private personsProvider: PersonProvider,
    private dialog: MatDialog
  ) {
    this.personsProvider = personsProvider;
  }

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

  startEdit(person: Person) {
    const dialogRef = this.dialog.open(EditPersonDialogComponent, {
      data: person
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataSource.loadPersons();
      }
    });
  }

  deletePerson(person: Person) {
    const dialogRef = this.dialog.open(DeletePersonDialogComponent, {
      data: person
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataSource.loadPersons();
      }
    });
  }
}
