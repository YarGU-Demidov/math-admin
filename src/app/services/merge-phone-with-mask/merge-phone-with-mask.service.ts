import { Injectable } from "@angular/core";
import phoneMask from "src/app/constants/masks/phone-mask";
import { conformToMask } from "angular2-text-mask";

@Injectable({
  providedIn: "root"
})
export class MergePhoneWithMaskService {
  constructor() {}
  mergeWithPhoneMask(phone: string): string {
    if (phone === null) return null;
    return conformToMask(phone, phoneMask, { guide: false }).conformedValue;
  }
}
