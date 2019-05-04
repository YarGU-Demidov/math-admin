import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Settings from "src/app/enteties/Settings";

@Injectable({
  providedIn: "root"
})
export class SettingsValidatorService {
  constructor(private fb: FormBuilder) {}
  getDataObjectPopulatedWithValues(formGroup: FormGroup) {
    const controls = formGroup.controls;
    let settings = new Settings();
    settings.defaultTitleForHomePage = controls.defaultTitleForHomePage.value;
    settings.defaultTitleForNewsPage = controls.defaultTitleForNewsPage.value;
    settings.perPageCount = controls.perPageCount.value;
    settings.siteName = controls.siteName.value;
    settings.titleDelimiter = controls.titleDelimiter.value;
    return settings;
  }

  populateInitalFormValuesWithData(settings: Settings): FormGroup {
    const formGroup = this.getInitialFormGroup();
    formGroup.setValue({
      defaultTitleForHomePage: settings.defaultTitleForHomePage,
      defaultTitleForNewsPage: settings.defaultTitleForNewsPage,
      perPageCount: settings.perPageCount,
      siteName: settings.siteName,
      titleDelimiter: settings.titleDelimiter
    });
    return formGroup;
  }
  getInitialFormGroup() {
    return this.fb.group({
      defaultTitleForHomePage: ["", Validators.required],
      defaultTitleForNewsPage: ["", Validators.required],
      perPageCount: ["", Validators.required],
      siteName: ["", Validators.required],
      titleDelimiter: ["", Validators.required]
    });
  }
}
