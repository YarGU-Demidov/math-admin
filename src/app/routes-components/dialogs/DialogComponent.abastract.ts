import { FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from "@angular/core";
import { DataProvider } from "src/app/services/DataProvider.abstract";
import { ValidatorService } from "src/app/services/validator-services/ValidatorSevice.interface";

export abstract class Dialog<T> {
  formGroup: FormGroup;
  constructor(
    protected dialogRef: MatDialogRef<Dialog<T>>,
    protected dataProvider: DataProvider<T>,
    protected validator: ValidatorService<T> = null,
    @Inject(MAT_DIALOG_DATA) protected dataObject: T = null
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  abstract onConfirm(): void;
}
