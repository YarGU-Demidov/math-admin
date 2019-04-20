import { DataSource } from "@angular/cdk/table";
import { ViewChild } from "@angular/core";
import { MatPaginator, MatDialog } from "@angular/material";
import { DataProvider } from "../DataProvider.abstract";
import { AbstractDataSource } from "src/app/dataSources/DataSource.abstract";

export abstract class DataTableWithDialogs<T> {
  columnsToDisplay: string[] = [];
  dataSource: AbstractDataSource<T>;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  constructor(
    protected dataProvider: DataProvider<T>,
    protected dialog: MatDialog
  ) {}
}
