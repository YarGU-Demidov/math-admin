import { Injectable } from "@angular/core";
import { Person } from "src/app/enteties/Person";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PersonProvider } from "../person-provider.abstract";
import { server, persons, global } from "src/app/api-endpoints/methodNames";
import version from "src/app/version/version";

@Injectable({
  providedIn: "root"
})
export class PersonHttpDataProvider extends PersonProvider {
  constructor(private http: HttpClient) {
    super();
  }

  getBySurnameWithoutUsers(surname: string): Observable<Person[]> {
    return this.http
      .get(
        `${server}/${version}/${persons.persons}/${
          persons.getAllBySurnameWithoutUsers
        }`,
        {
          params: new HttpParams().set("surname", surname)
        }
      )
      .pipe(map(res => res["data"]));
  }
  getAllWithoutUsers(): Observable<Person[]> {
    return this.http
      .get(
        `${server}/${version}/${persons.persons}/${persons.getAllWithoutUsers}`,
        {
          params: new HttpParams()
        }
      )
      .pipe(map(res => res["data"]));
  }
  getAll(): Observable<Person[]> {
    return this.http
      .get(`${server}/${version}/${persons.persons}/${global.getAll}`)
      .pipe(map(res => res["data"]));
  }

  getPaged(page?: number, perPage?: number): Observable<Person[]> {
    throw new Error("Method not implemented.");
  }

  getCount(): Observable<number> {
    throw new Error("Method not implemented.");
  }

  getBySurname(surname: string): Observable<Person[]> {
    return this.http
      .get(
        `${server}/${version}/${persons.persons}/${persons.getAllBySurname}`,
        {
          params: new HttpParams().set("surname", surname)
        }
      )
      .pipe(map(res => res["data"]));
  }

  getPersonsCount(): Observable<number> {
    throw new Error("Method not implemented.");
  }

  addData(person: Person): void {
    throw new Error("Method not implemented.");
  }

  editData(newPerson: Person): void {
    throw new Error("Method not implemented.");
  }

  deleteData(persons: Person[]): void {
    throw new Error("Method not implemented.");
  }
}
