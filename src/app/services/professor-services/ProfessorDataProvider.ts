import { DataProvider } from "../DataProvider.abstract";
import { Professor } from "src/app/enteties/Professor";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  server,
  professors,
  global,
  persons
} from "src/app/api-endpoints/methodNames";
import version from "./../../version/version";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProfessorDataProvider extends DataProvider<Professor> {
  constructor(private http: HttpClient) {
    super();
  }

  getById(professorId: string): Observable<Professor> {
    return this.http
      .get(
        `${server}/${version}/${professors.professors}/${
          professors.getByIdWithPerson
        }`,
        {
          params: new HttpParams().set("id", professorId)
        }
      )
      .pipe(map(res => res["data"]));
  }

  addData(data: Professor): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http
      .post(
        `${server}/${version}/${professors.professors}/${global.create}`,
        this.getProfessorObject(data),
        { headers }
      )
      .pipe(map(res => res["status"]));
  }
  getProfessorObject(data: Professor): object {
    const result = {};
    if (data.id) {
      result["id"] = data.id;
    }
    result["PersonId"] = data.person.id;
    result["Faculty"] = data.faculty;
    result["Department"] = data.department;
    result["Description"] = data.description;
    result["MathNetLink"] = data.mathNetLink;
    result["Status"] = data.status;
    result["ScientificTitle"] = data.scientificTitle;
    result["Graduated"] = data.graduated;
    result["Theses"] = data.theses;
    result["TermPapers"] = data.termPapers;
    result["BibliographicIndexOfWorks"] = data.bibliographicIndexOfWorks;
    return result;
  }
  editData(newProfessor: Professor): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http
      .put(
        `${server}/${version}/${professors.professors}/${global.update}`,
        this.getProfessorObject(newProfessor),
        { headers }
      )
      .pipe(map(res => res["status"]));
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
