import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PhoneNumberParserService {
  constructor() {}
  parse(number: string): string {
    const result = number.replace(/[\(\) ]/g, "");
    return result;
  }
}
