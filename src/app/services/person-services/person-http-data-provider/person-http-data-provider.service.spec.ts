import { TestBed } from "@angular/core/testing";

import { PersonHttpDataProvider } from "./person-http-data-provider.service";

describe("PersonHttpDataProviderService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: PersonHttpDataProvider = TestBed.get(PersonHttpDataProvider);
    expect(service).toBeTruthy();
  });
});
