import { TestBed } from "@angular/core/testing";

import { CategoryHttpDataProvider } from "./CategoryHttpDataProvider.service";

describe("CategoryDataProviderService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CategoryHttpDataProvider = TestBed.get(
      CategoryHttpDataProvider
    );
    expect(service).toBeTruthy();
  });
});
