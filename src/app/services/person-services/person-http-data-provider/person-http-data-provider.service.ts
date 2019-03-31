import { Injectable } from "@angular/core";
import { Person } from "src/app/enteties/Person";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
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
    return this.http
      .get(
        `${server}/${version}/${persons.persons}/${global.getByPageNested}`,
        {
          params: new HttpParams()
            .set("page", page.toString())
            .set("perPage", perPage.toString())
        }
      )
      .pipe(map(res => res["data"]));
  }

  getCount(): Observable<number> {
    return this.http
      .get(`${server}/${version}/${persons.persons}/${global.getCount}`, {
        params: new HttpParams()
      })
      .pipe(map(res => res["data"]));
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

  addData(person: Person): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http
      .post(
        `${server}/${version}/${persons.persons}/${global.create}`,
        this.personToPersonDto(person),
        { headers }
      )
      .pipe(map(res => res["status"]));
  }

  editData(newPerson: Person): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http
      .put(
        `${server}/${version}/${persons.persons}/${global.update}`,
        this.personToPersonDto(newPerson),
        { headers }
      )
      .pipe(map(res => res["status"]));
  }

  deleteData(personsToDelete: Person[]): Observable<any> {
    return this.http
      .request(
        "delete",
        `${server}/${version}/${persons.persons}/${global.deleteMany}`,
        {
          body: personsToDelete.map(person => person.id)
        }
      )
      .pipe(map(res => res["status"]));
  }
  private personToPersonDto(person: Person) {
    if (person.id) {
      return {
        Id: person.id,
        Name: person.name,
        MiddleName: person.middleName,
        Surname: person.surname,
        Phone: person.phone,
        AdditionalPhone: person.additionalPhone,
        Birthday: person.birthday
      };
    }
    return {
      Name: person.name,
      MiddleName: person.middleName,
      Surname: person.surname,
      Phone: person.phone,
      AdditionalPhone: person.additionalPhone,
      Birthday: person.birthday
    };
  }
}
