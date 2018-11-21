import { FormGroup } from "@angular/forms";

export interface ValidatorService<T> {
  getDataObjectPopulatedWithValues(formGroup: FormGroup): T;
  populateInitalFormValuesWithData(data: T): FormGroup;
  getInitialFormGroup(): FormGroup;
}
