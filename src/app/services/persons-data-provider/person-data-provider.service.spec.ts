import { TestBed } from "@angular/core/testing";

import { PersonDataProviderService } from "./person-data-provider.service";

describe("PersonDataProviderService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: PersonDataProviderService = TestBed.get(
      PersonDataProviderService
    );
    expect(service).toBeTruthy();
  });
});
