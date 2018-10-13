import { TestBed } from "@angular/core/testing";

import { PhoneNumberParserService } from "./phone-number-parser.service";

describe("PhoneNumberParserService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: PhoneNumberParserService = TestBed.get(
      PhoneNumberParserService
    );
    expect(service).toBeTruthy();
  });
});
