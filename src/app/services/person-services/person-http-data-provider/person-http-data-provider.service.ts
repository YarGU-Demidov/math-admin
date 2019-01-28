import { Injectable } from "@angular/core";
import { Person } from "src/app/enteties/Person";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PersonProvider } from "../person-provider.abstract";

@Injectable({
  providedIn: "root"
})
export class PersonHttpDataProviderService extends PersonProvider {
  getAll(): Observable<Person[]> {
    throw new Error("Method not implemented.");
  }
  getPaged(page?: number, perPage?: number): Observable<Person[]> {
    throw new Error("Method not implemented.");
  }
  getCount(): Observable<number> {
    throw new Error("Method not implemented.");
  }
  constructor(private http: HttpClient) {
    super();
  }
  getPersons(
    sortField: string,
    sortOrder: string,
    skip?: number,
    take?: number
  ): Observable<Person[]> {
    return this.http
      .get("/api/lessons", {
        params: new HttpParams()
          .set("filter", sortField)
          .set("sortOrder", sortOrder)
          .set("skip", skip.toString())
          .set("take", take.toString())
      })
      .pipe(map(res => res["payload"]));
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
