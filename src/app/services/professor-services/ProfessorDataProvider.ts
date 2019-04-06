import { DataProvider } from "../DataProvider.abstract";
import { Professor } from "src/app/enteties/Professor";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { server, professors, global } from "src/app/api-endpoints/methodNames";
import version from "./../../version/version";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProfessorDataProvider extends DataProvider<Professor> {
  constructor(private http: HttpClient) {
    super();
  }
  addData(data: Professor): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http
      .post(
        `${server}/${version}/${professors.professors}/${global.create}`,
        {
          PersonId: data.person.id,
          Faculty: data.faculty,
          Department: data.department,
          Description: data.description,
          MathNetLink: data.mathNetLink,
          Status: data.status,
          ScientificTitle: data.scientificTitle,
          Graduated: data.graduated,
          Theses: data.theses,
          TermPapers: data.termPapers,
          BibliographicIndexOfWorks: data.bibliographicIndexOfWorks
        },
        { headers }
      )
      .pipe(map(res => res["status"]));
  }
  editData(newData: Professor): Observable<any> {
    throw new Error("Method not implemented.");
  }
  deleteData(data: Professor[]): Observable<any> {
    return this.http
      .request(
        "delete",
        `${server}/${version}/${professors.professors}/delete-many`,
        {
          body: data.map(professor => professor.id)
        }
      )
      .pipe(map(res => res["status"]));
  }
  getAll(): Observable<Professor[]> {
    throw new Error("Method not implemented.");
  }
  getAllBySurname(surname: string) {
    return this.http
      .get(
        `${server}/${version}/${professors.professors}/${
          professors.getAllBySurname
        }`,
        {
          params: new HttpParams().set("surname", surname)
        }
      )
      .pipe(map(res => res["data"]));
  }
  getPaged(page?: number, perPage?: number): Observable<Professor[]> {
    return this.http
      .get(
        `${server}/${version}/${professors.professors}/${
          global.getByPageNested
        }`,
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
      .get(`${server}/${version}/${professors.professors}/${global.getCount}`, {
        params: new HttpParams()
      })
      .pipe(map(res => res["data"]));
  }
}
