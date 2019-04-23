import { Component, OnInit } from "@angular/core";
import Category from "src/app/enteties/Category";
import { AddDialogComponent } from "../../addDialogComponent";
import { MatDialogRef } from "@angular/material";
import { CategoryProvider } from "src/app/services/category-services/data-provider/CategoryProvider.abstract";
import { CategoryValidator } from "src/app/services/validator-services/category-validator/category-validator.service";

@Component({
  selector: "app-add-category-dialog",
  templateUrl: "./add-category-dialog.component.html",
  styleUrls: ["./add-category-dialog.component.css"]
})
export class AddCategoryDialogComponent extends AddDialogComponent<Category>
  implements OnInit {
  constructor(
    protected dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    protected categoryProvider: CategoryProvider,
    protected validator: CategoryValidator
  ) {
    super(dialogRef, categoryProvider, validator);
  }
  ngOnInit() {
    this.formGroup = this.validator.getInitialFormGroup();
  }
}
