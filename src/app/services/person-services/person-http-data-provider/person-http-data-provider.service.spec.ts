import { TestBed } from "@angular/core/testing";

import { PersonHttpDataProviderService } from "./person-http-data-provider.service";

describe("PersonHttpDataProviderService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: PersonHttpDataProviderService = TestBed.get(
      PersonHttpDataProviderService
    );
    expect(service).toBeTruthy();
  });
});
