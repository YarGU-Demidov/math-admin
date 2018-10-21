import { TestBed } from "@angular/core/testing";

import { PersonInMemoryDataProviderService } from "./person-in-memory-data-provider.service";

describe("PersonDataProviderService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: PersonInMemoryDataProviderService = TestBed.get(
      PersonInMemoryDataProviderService
    );
    expect(service).toBeTruthy();
  });
});
