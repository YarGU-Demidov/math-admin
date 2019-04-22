import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { DataTableWithSelection } from "src/app/services/tables/DataTableWithSelection";
import Category from "src/app/enteties/Category";
import { CategoryDataSource } from "src/app/dataSources/CategoryDataSource";
import { CategoryProvider } from "src/app/services/category-services/data-provider/CategoryProvider.abstract";
import { MatDialog } from "@angular/material";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { Person } from "src/app/enteties/Person";
import { EditPersonDialogComponent } from "../dialogs/edit-dialog/edit-person-dialog/edit-person-dialog.component";
import { DeletePersonDialogComponent } from "../dialogs/delete-dialog/delete-person-dialog/delete-person-dialog.component";
import { AddPersonDialogComponent } from "../dialogs/add-dialog/add-person-dialog/add-person-dialog.component";

@Component({
  selector: "app-categories-table",
  templateUrl: "./categories-table.component.html",
  styleUrls: ["./categories-table.component.css"]
})
export class CategoriesTableComponent extends DataTableWithSelection<Category>
  implements OnInit {
  columnsToDisplay: string[] = [
    "select",
    "name",
    "alias",
    "description",
    "actionsColumn"
  ];
  dataSource: CategoryDataSource;
  dataProvider: CategoryProvider;
  @ViewChild("filterAlias")
  filterAlias: ElementRef;

  constructor(categoryProvider: CategoryProvider, dialog: MatDialog) {
    super(categoryProvider, dialog);
  }

  ngOnInit() {
    this.dataSource = new CategoryDataSource(this.dataProvider, this.paginator);
  }
  ngAfterViewInit() {
    setTimeout(() => this.dataSource.loadCategories());

    fromEvent(this.filterAlias.nativeElement, "keyup")
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
        })
      )
      .subscribe(() => {
        if (this.filterAlias.nativeElement.value !== "") {
          this.dataSource.loadCategoriesByAlias(
            this.filterAlias.nativeElement.value
          );
        } else this.dataSource.loadCategories();
      });

    this.paginator.page.subscribe(() => this.dataSource.loadCategories());
  }
  editCategory(person: Person) {
    const dialogRef = this.dialog.open(EditPersonDialogComponent, {
      data: person
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataSource.loadCategories();
      }
      this.selection.clear();
    });
  }

  deleteCategory() {
    const dialogRef = this.dialog.open(DeletePersonDialogComponent, {
      data: this.selection.selected
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataSource.loadCategories();
      }
      this.selection.clear();
    });
  }

  addCategory() {
    const dialogRef = this.dialog.open(AddPersonDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataSource.loadCategories();
      }
      this.selection.clear();
    });
  }
}
