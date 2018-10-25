import { Observable } from "rxjs";
import { Person } from "src/app/enteties/person";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export abstract class PersonProvider {
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
