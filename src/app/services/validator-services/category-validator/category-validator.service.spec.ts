import { TestBed } from "@angular/core/testing";

import { CategoryValidator } from "./category-validator.service";

describe("CategoryValidatorService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CategoryValidator = TestBed.get(CategoryValidator);
    expect(service).toBeTruthy();
  });
});
