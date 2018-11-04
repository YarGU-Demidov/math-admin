import { FormGroup } from "@angular/forms";

export interface ValidatorService<T> {
  formGroup: FormGroup;
  getValidator(): FormGroup;
  getDataObjectPopulatedWithValues(): T;
}
