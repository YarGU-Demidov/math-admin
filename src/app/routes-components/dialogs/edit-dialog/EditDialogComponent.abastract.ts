import { FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from "@angular/core";
import { DataProvider } from "src/app/services/DataProvider.abstract";
import { ValidatorService } from "src/app/services/validator-services/ValidatorSevice.interface";

export abstract class EditDialog<T> {
  formGroup: FormGroup;
  constructor(
    protected dialogRef: MatDialogRef<EditDialog<T>>,
    @Inject(MAT_DIALOG_DATA) protected dataObject: T,
    protected dataProvider: DataProvider<T>,
    protected validator: ValidatorService<T>
  ) {}

  ngOnInit() {
    this.formGroup = this.populateInitalFormValuesWithData();
  }

  abstract populateInitalFormValuesWithData(): FormGroup;

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    const data = this.validator.getDataObjectPopulatedWithValues();
    this.dataProvider.editData(data);
  }
}
