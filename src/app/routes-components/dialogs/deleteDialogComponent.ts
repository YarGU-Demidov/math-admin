import { FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from "@angular/core";
import { DataProvider } from "src/app/services/DataProvider.abstract";
import { ValidatorService } from "src/app/services/validator-services/ValidatorSevice.interface";
import { Dialog } from "./DialogComponent.abastract";

export abstract class DeleteDialogComponent<T> extends Dialog<T> {
  formGroup: FormGroup;
  constructor(
    protected dialogRef: MatDialogRef<Dialog<T>>,
    protected dataProvider: DataProvider<T>,
    @Inject(MAT_DIALOG_DATA) protected data: T[],
    protected validator: ValidatorService<T> = null
  ) {
    super(dialogRef, dataProvider, validator);
  }

  onConfirm(): void {
    setTimeout(() => this.loadingSubject.next(true), 0);
    this.dataProvider.deleteData(this.data).subscribe(() => {
      this.loadingSubject.next(false);
      this.dialogRef.close(1);
    });
  }
}
