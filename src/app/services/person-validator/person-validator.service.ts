import { Injectable } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ValidatorService } from "angular4-material-table";

@Injectable({
  providedIn: "root"
})
export class PersonValidatorService implements ValidatorService {
  constructor(private fb: FormBuilder) {}
  getRowValidator(): FormGroup {
    return this.fb.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      middlename: [""],
      email: ["", [Validators.required, Validators.email]],
      phone: [
        "",
        [
          Validators.required,
          Validators.pattern("\\+7 \\([0-9]{3}\\) [0-9]{3} [0-9]{2} [0-9]{2}")
        ]
      ],
      additionalPhone: [""],
      birthday: ["", Validators.required]
    });
  }
}
