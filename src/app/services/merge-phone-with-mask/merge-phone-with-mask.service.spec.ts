import { TestBed } from "@angular/core/testing";

import { MergePhoneWithMaskService } from "./merge-phone-with-mask.service";

describe("MergePhoneToMaskService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: MergePhoneWithMaskService = TestBed.get(
      MergePhoneWithMaskService
    );
    expect(service).toBeTruthy();
  });
});
