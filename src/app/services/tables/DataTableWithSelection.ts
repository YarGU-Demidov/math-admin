import { DataSource } from "@angular/cdk/table";
import { ViewChild } from "@angular/core";
import { MatPaginator, MatDialog } from "@angular/material";
import { DataProvider } from "../DataProvider.abstract";
import { AbstractDataSource } from "src/app/dataSources/DataSource.abstract";
import { DataTableWithDialogs } from "./DataTableWithDialogs";
import { SelectionModel } from "@angular/cdk/collections";

export class DataTableWithSelection<T> extends DataTableWithDialogs<T> {
  constructor(dataProvider: DataProvider<T>, dialog: MatDialog) {
    super(dataProvider, dialog);
  }
  selection = new SelectionModel<T>(true, []);
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
}
