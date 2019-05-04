import { TestBed } from "@angular/core/testing";

import { SettingsValidatorService } from "./settings-validator.service";

describe("SettingsValidatorService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: SettingsValidatorService = TestBed.get(
      SettingsValidatorService
    );
    expect(service).toBeTruthy();
  });
});
