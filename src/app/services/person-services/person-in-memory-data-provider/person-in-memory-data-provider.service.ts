import { Injectable } from "@angular/core";
import { Person } from "src/app/enteties/Person";
import { Observable, BehaviorSubject, of } from "rxjs";
import { MergePhoneWithMaskService } from "../../merge-phone-with-mask/merge-phone-with-mask.service";
import { getPersons, deletePerson } from "./data";
import { PersonProvider } from "../person-provider.abstract";

@Injectable({
  providedIn: "root"
})
export class PersonInMemoryDataProviderService extends PersonProvider {
  getBySurnameWithoutProfessors(surname: string): Observable<Person[]> {
    throw new Error("Method not implemented.");
  }
  getAllWithoutProfessors(): Observable<Person[]> {
    throw new Error("Method not implemented.");
  }
  getBySurnameWithoutUsers(surname: string): Observable<Person[]> {
    throw new Error("Method not implemented.");
  }
  getAllWithoutUsers(): Observable<Person[]> {
    throw new Error("Method not implemented.");
  }
  constructor(private mergePhoneWithMaskService: MergePhoneWithMaskService) {
    super();
  }
  getBySurname(surname: string): Observable<Person[]> {
    throw new Error("Method not implemented.");
  }
  getAll(): Observable<Person[]> {
    let personList = getPersons();
    personList.map(function(person: Person) {
      if (person.phone !== null)
        person.phone = this.mergePhoneWithMaskService.mergeWithPhoneMask(
          person.phone
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
  getPaged(page?: number, perPage?: number): Observable<Person[]> {
    let personList = getPersons();
    personList.map(function(person: Person) {
      if (person.phone !== null)
        person.phone = this.mergePhoneWithMaskService.mergeWithPhoneMask(
          person.phone
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
  getCount(): Observable<number> {
    return of(Math.round(Math.random() * 10));
  }

  addData(person: Person): Observable<any> {
    console.log(`person added ${person}`);
    getPersons().push(person);
    return;
  }
  editData(newPerson: Person): Observable<any> {
    console.log(`person edited ${newPerson}`);
    const data = getPersons();
    const index = data.findIndex(person => person.id == newPerson.id);
    data[index] = newPerson;
    return;
  }
  deleteData(data: Person[]): Observable<any> {
    console.log(`persons deleted ${data}`);
    return;
  }
}
