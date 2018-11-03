import { Observable } from "rxjs";
import { Person } from "src/app/enteties/Person";
import { Injectable } from "@angular/core";
import { DataProvider } from "../DataProvider.abstract";

@Injectable({
  providedIn: "root"
})
export abstract class PersonProvider implements DataProvider {
  abstract getPersons(
    sortField: string,
    sortOrder: string,
    skip?: number,
    take?: number
  ): Observable<Person[]>;
  abstract getPersonsCount(): Observable<number>;
  abstract addPreson(person: Person);
  abstract editPerson(newPerson: Person);
  abstract deletePerson(id: string);
}
