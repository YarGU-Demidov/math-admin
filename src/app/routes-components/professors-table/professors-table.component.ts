import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Professor } from "src/app/enteties/Professor";
import { DataTableWithSelection } from "src/app/services/tables/DataTableWithSelection";
import { MatDialog } from "@angular/material";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { ProfessorDataSource } from "src/app/dataSources/ProfessorDataSource";
import { ProfessorDataProvider } from "src/app/services/professor-services/ProfessorDataProvider";
import { DeleteProfessorDialogComponent } from "../dialogs/delete-dialog/delete-professor-dialog/delete-professor-dialog.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-professors-table",
  templateUrl: "./professors-table.component.html",
  styleUrls: ["./professors-table.component.css"]
})
export class ProfessorsTableComponent extends DataTableWithSelection<Professor>
  implements OnInit {
  columnsToDisplay: string[] = [
    "select",
    "snm", //ФИО
    "faculty",
    "department",
    "creationDate",
    "actionsColumn"
  ];
  dataSource: ProfessorDataSource;
  dataProvider: ProfessorDataProvider;
  @ViewChild("filterSurname")
  filterSurname: ElementRef;
  constructor(
    dataProvider: ProfessorDataProvider,
    dialog: MatDialog,
    private router: Router
  ) {
    super(dataProvider, dialog);
  }
  ngOnInit() {
    this.dataSource = new ProfessorDataSource(
      this.dataProvider,
      this.paginator
    );
  }
  ngAfterViewInit() {
    setTimeout(() => this.dataSource.loadProfessors());

    fromEvent(this.filterSurname.nativeElement, "keyup")
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
        })
      )
      .subscribe(() => {
        if (this.filterSurname.nativeElement.value !== "") {
          this.dataSource.loadProfessorsBySurname(
            this.filterSurname.nativeElement.value
          );
        } else this.dataSource.loadProfessors();
      });

    this.paginator.page.subscribe(() => this.dataSource.loadProfessors());
  }
  deleteProfessor() {
    const dialogRef = this.dialog.open(DeleteProfessorDialogComponent, {
      data: this.selection.selected
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataSource.loadProfessors();
      }
      this.selection.clear();
    });
  }
  addProfessor() {
    this.router.navigate(["/addProfessors"]);
  }
  editProfessor(id: string) {
    this.router.navigate(["/editProfessor", id]);
  }
}
