import { Component, OnInit } from "@angular/core";
import { SettingsDataProvider } from "src/app/services/settings-services/SettingsDataProvider";
import { FormGroup } from "@angular/forms";
import { SettingsValidatorService } from "src/app/services/validator-services/settings-validator/settings-validator.service";
import { BehaviorSubject } from "rxjs";
import { pipe } from "@angular/core/src/render3";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  protected isFormReady: boolean;
  formGroup: FormGroup;
  constructor(
    private dataProvider: SettingsDataProvider,
    private validator: SettingsValidatorService
  ) {}
  ngOnInit() {
    this.formGroup = this.validator.getInitialFormGroup();
    this.loadingSubject.next(true);
    this.dataProvider
      .getSettings()
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe(settings => {
        this.formGroup = this.validator.populateInitalFormValuesWithData(
          settings
        );
        this.isFormReady = true;
      });
  }
  onConfirm() {
    const data = this.validator.getDataObjectPopulatedWithValues(
      this.formGroup
    );
    this.loadingSubject.next(true);
    this.dataProvider
      .addSettings(data)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe();
  }
}
