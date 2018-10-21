import { Injectable } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class PersonValidatorService {
  constructor(private fb: FormBuilder) {}
  getRowValidator(): FormGroup {
    return this.fb.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      middleName: [""],
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
