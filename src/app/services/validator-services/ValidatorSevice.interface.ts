import { FormGroup } from "@angular/forms";

export interface ValidatorService<T> {
  formGroup: FormGroup;
  getDataObjectPopulatedWithValues(): T;
  populateInitalFormValuesWithData(data: T);
}
