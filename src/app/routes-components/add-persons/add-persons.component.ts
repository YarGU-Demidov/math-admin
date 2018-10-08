import { Component, OnInit, Output } from "@angular/core";
import { Person } from "../../enteties/person";
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup
} from "@angular/forms";
import { JsonPipe } from "@angular/common";

@Component({
  selector: "app-add-persons",
  templateUrl: "./add-persons.component.html",
  styleUrls: ["./add-persons.component.css"]
})
export class AddPersonsComponent implements OnInit {
  @Output()
  public currentPerson: Person;

  addPersonReactiveForm: FormGroup;

  public constructor(private fb: FormBuilder) {
    this.currentPerson = new Person();
  }

  public ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.addPersonReactiveForm = this.fb.group({
      name: ["", [Validators.required, Validators.pattern(/[А-я]/)]],
      surname: ["", [Validators.required, Validators.pattern(/[А-я]/)]],
      middlename: ["", [Validators.pattern(/[А-я]/)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required]]
    });
  }

  public diagnostic() {
    return JSON.stringify(this.addPersonReactiveForm.controls["name"].value);
  }
  onSubmit() {
    const controls = this.addPersonReactiveForm.controls;

    /** Проверяем форму на валидность */
    if (this.addPersonReactiveForm.invalid) {
      /** Если форма не валидна, то помечаем все контролы как touched*/
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      /** Прерываем выполнение метода*/
      return;
    }

    /** TODO: Обработка данных формы */
    console.log(this.addPersonReactiveForm.value);
  }
}
