import { Component, OnInit, Inject } from "@angular/core";
import { CategoryProvider } from "src/app/services/category-services/data-provider/CategoryProvider.abstract";
import { DeleteDialogComponent } from "../../deleteDialogComponent";
import { Person } from "src/app/enteties/Person";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import Category from "src/app/enteties/Category";

@Component({
  selector: "app-delete-category-dialog",
  templateUrl: "./delete-category-dialog.component.html",
  styleUrls: ["./delete-category-dialog.component.css"]
})
export class DeleteCategoryDialogComponent extends DeleteDialogComponent<
  Category
> {
  constructor(
    protected dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
    protected categoryDataService: CategoryProvider,
    @Inject(MAT_DIALOG_DATA) public data: Category[]
  ) {
    super(dialogRef, categoryDataService, data);
  }
}
