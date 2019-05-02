import { Injectable } from "@angular/core";
import Category from "src/app/enteties/Category";
import { CategoryProvider } from "./CategoryProvider.abstract";
import { Observable } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { server, global, categories } from "src/app/api-endpoints/methodNames";
import version from "src/app/version/version";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoryHttpDataProvider extends CategoryProvider {
  constructor(private http: HttpClient) {
    super();
  }
  getCategoryByAlias(alias: string): Observable<Category[]> {
    return this.http
      .get(
        `${server}/${version}/${categories.categories}/${global.getByAlias}`,
        {
          params: new HttpParams().set("alias", alias)
        }
      )
      .pipe(map(res => res["data"]));
  }
  addData(data: Category): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http
      .post(
        `${server}/${version}/${categories.categories}/${global.create}`,
        {
          Description: data.description,
          Alias: data.alias,
          Name: data.name
        },
        { headers }
      )
      .pipe(map(res => res["status"]));
  }
  editData(newData: Category): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http
      .put(
        `${server}/${version}/${categories.categories}/${global.update}`,
        {
          Id: newData.id,
          Description: newData.description,
          Alias: newData.alias,
          Name: newData.name
        },
        { headers }
      )
      .pipe(map(res => res["status"]));
  }
  deleteData(data: Category[]): Observable<any> {
    return this.http
      .request(
        "delete",
        `${server}/${version}/${categories.categories}/delete-many`,
        {
          body: data.map(category => category.id)
        }
      )
      .pipe(map(res => res["status"]));
  }
  getAll(): Observable<Category[]> {
    return this.http
      .get(`${server}/${version}/${categories.categories}/${global.getAll}`)
      .pipe(map(res => res["data"]));
  }
  getPaged(page?: number, perPage?: number): Observable<Category[]> {
    return this.http
      .get(`${server}/${version}/${categories.categories}/${global.getPaged}`, {
        params: new HttpParams()
          .set("page", page.toString())
          .set("perPage", perPage.toString())
      })
      .pipe(map(res => res["data"]));
  }
  getCount(): Observable<number> {
    return this.http
      .get(`${server}/${version}/${categories.categories}/${global.getCount}`, {
        params: new HttpParams()
      })
      .pipe(map(res => res["data"]));
  }
}
