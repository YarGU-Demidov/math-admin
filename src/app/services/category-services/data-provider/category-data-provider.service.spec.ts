import { TestBed } from "@angular/core/testing";

import { CategoryDataProvider } from "./category-data-provider.service";

describe("CategoryDataProviderService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CategoryDataProvider = TestBed.get(CategoryDataProvider);
    expect(service).toBeTruthy();
  });
});
