import { Injectable } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ValidatorService } from "../ValidatorSevice.interface";
import Category from "src/app/enteties/Category";

@Injectable({
  providedIn: "root"
})
export class CategoryValidator implements ValidatorService<Category> {
  constructor(private fb: FormBuilder) {}
  getDataObjectPopulatedWithValues(formGroup: FormGroup) {
    const controls = formGroup.controls;
    let category = new Category();
    category.id = controls.id.value;
    category.name = controls.name.value;
    category.description = controls.description.value;
    category.alias = controls.alias.value;
    return category;
  }

  populateInitalFormValuesWithData(category: Category): FormGroup {
    const formGroup = this.getInitialFormGroup();
    formGroup.setValue({
      id: category.id,
      name: category.name,
      description: category.description,
      alias: category.alias
    });
    return formGroup;
  }
  getInitialFormGroup() {
    return this.fb.group({
      id: [""],
      name: ["", Validators.required],
      description: [""],
      alias: ["", Validators.required]
    });
  }
}
