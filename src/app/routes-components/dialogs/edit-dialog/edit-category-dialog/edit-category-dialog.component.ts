import { Component, OnInit, Inject } from "@angular/core";
import Category from "src/app/enteties/Category";
import { CategoryProvider } from "src/app/services/category-services/data-provider/CategoryProvider.abstract";
import { CategoryValidator } from "src/app/services/validator-services/category-validator/category-validator.service";
import { EditDialogComponent } from "../../editDialogComponent";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-edit-category-dialog",
  templateUrl: "./edit-category-dialog.component.html",
  styleUrls: ["./edit-category-dialog.component.css"]
})
export class EditCategoryDialogComponent extends EditDialogComponent<Category> {
  constructor(
    protected dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    protected categoryService: CategoryProvider,
    protected validator: CategoryValidator,
    @Inject(MAT_DIALOG_DATA) protected category: Category
  ) {
    super(dialogRef, categoryService, validator, category);
  }

  ngOnInit() {
    this.formGroup = this.validator.populateInitalFormValuesWithData(
      this.dataObject
    );
  }
}
