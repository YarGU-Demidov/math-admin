import { Injectable } from "@angular/core";
import { Person } from "src/app/enteties/person";
import { Observable, BehaviorSubject, of } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { MergePhoneWithMaskService } from "../../merge-phone-with-mask/merge-phone-with-mask.service";
import IPersonProvider from "../person-provider.interface";
import data from "./data";

@Injectable({
  providedIn: "root"
})
export class PersonInMemoryDataProviderService {
  constructor(
    private http: HttpClient,
    private mergePhoneWithMaskService: MergePhoneWithMaskService
  ) {}

  getPersons(
    sortField: string,
    sortOrder: string,
    skip: number = 0,
    take: number = 5
  ): Observable<Person[]> {
    let personList = data;
    personList.map(function(person: any) {
      if (person.personPhone !== null)
        person.personPhone = this.mergePhoneWithMaskService.mergeWithPhoneMask(
          person.personPhone
        );
      person.additionalPhone = this.mergePhoneWithMaskService.mergeWithPhoneMask(
        person.additionalPhone
      );
    }, this);
    for (let i = 1; i < personList.length; i++) {
      let temp = personList[i];
      personList[i] = personList[i - 1];
      personList[i - 1] = temp;
    }
    return of(personList);
  }
  getPersonsCount(): Observable<number> {
    return of(Math.round(Math.random() * 10));
  }
  addPreson(person: Person) {}
  editPerson(newPerson: Person) {}
  deletePerson(person) {}
}
