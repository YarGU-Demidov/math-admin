import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { Person } from "src/app/enteties/Person";
import { MatPaginator } from "@angular/material/paginator";
import { tap, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { merge, fromEvent } from "rxjs";
import { MatDialog } from "@angular/material";
import { PersonDataSource } from "src/app/dataSources/PersonDataSource";
import { PersonProvider } from "src/app/services/person-services/person-provider.abstract";
import { EditPersonDialogComponent } from "../dialogs/edit-dialog/edit-person-dialog/edit-person-dialog.component";
import { DeletePersonDialogComponent } from "../dialogs/delete-dialog/delete-person-dialog/delete-person-dialog.component";
import { AddPersonDialogComponent } from "../dialogs/add-dialog/add-person-dialog/add-person-dialog.component";

@Component({
  selector: "app-table-persons",
  templateUrl: "./persons-table.component.html",
  styleUrls: ["./persons-table.component.css", "./persons-table.component.scss"]
})
export class PersonsTableComponent implements OnInit {
  columnsToDisplay: string[] = [
    "select",
    "name",
    "surname",
    "middleName",
    "email",
    "phone",
    "additionalPhone",
    "birthday",
    "isUser",
    "actionsColumn"
  ];

  selection = new SelectionModel<Person>(true, []);
  dataSource: PersonDataSource;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild("filterSurname")
  filterSurname: ElementRef;

  constructor(
    private personsProvider: PersonProvider,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSource = new PersonDataSource(
      this.personsProvider,
      this.paginator
    );
  }
  ngAfterViewInit() {
    this.dataSource.loadPersons();

    fromEvent(this.filterSurname.nativeElement, "keyup")
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
        })
      )
      .subscribe(() => {
        if (this.filterSurname.nativeElement.value !== "") {
          this.dataSource.loadPersonsBySurname(
            this.filterSurname.nativeElement.value
          );
        } else this.dataSource.loadPersons();
      });

    this.paginator.page.subscribe(() => this.dataSource.loadPersons());
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  editPerson(person: Person) {
    const dialogRef = this.dialog.open(EditPersonDialogComponent, {
      data: person
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataSource.loadPersons();
      }
      this.selection.clear();
    });
  }

  deletePerson() {
    const dialogRef = this.dialog.open(DeletePersonDialogComponent, {
      data: this.selection.selected
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataSource.loadPersons();
      }
      this.selection.clear();
    });
  }

  addPerson() {
    const dialogRef = this.dialog.open(AddPersonDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataSource.loadPersons();
      }
      this.selection.clear();
    });
  }
}
