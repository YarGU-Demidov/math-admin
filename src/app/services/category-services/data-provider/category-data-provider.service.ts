import { Injectable } from "@angular/core";
import Category from "src/app/enteties/Category";
import { CategoryProvider } from "./CategoryProvider.abstract";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { server, global, categories } from "src/app/api-endpoints/methodNames";
import version from "src/app/version/version";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoryDataProvider extends CategoryProvider {
  constructor(private http: HttpClient) {
    super();
  }
  getCategoryByAlias(alias: string): Observable<Category[]> {
    throw new Error("Method not implemented.");
  }
  addData(data: Category): Observable<any> {
    throw new Error("Method not implemented.");
  }
  editData(newData: Category): Observable<any> {
    throw new Error("Method not implemented.");
  }
  deleteData(data: Category[]): Observable<any> {
    throw new Error("Method not implemented.");
  }
  getAll(): Observable<Category[]> {
    throw new Error("Method not implemented.");
  }
  getPaged(page?: number, perPage?: number): Observable<Category[]> {
    throw new Error("Method not implemented.");
  }
  getCount(): Observable<number> {
    return this.http
      .get(`${server}/${version}/${categories.categories}/${global.getCount}`, {
        params: new HttpParams()
      })
      .pipe(map(res => res["data"]));
  }
}
