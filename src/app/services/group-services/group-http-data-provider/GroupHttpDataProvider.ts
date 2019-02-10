import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "src/app/enteties/User";
import version from "./../../../version/version";
import {
  global,
  users,
  server,
  groups
} from "./../../../api-endpoints/methodNames";
import { GroupProvider } from "../GroupProvider.abstract";
import Group from "src/app/enteties/Group";
import { group } from "@angular/animations";

@Injectable({
  providedIn: "root"
})
export class GroupHttpDataProvider extends GroupProvider {
  constructor(private http: HttpClient) {
    super();
  }
  getGroupsByAlias(alias: string): Observable<Group[]> {
    return this.http
      .get(`${server}/${version}/${groups.groups}/${global.getByAlias}`, {
        params: new HttpParams().set("alias", alias)
      })
      .pipe(map(res => res["data"]));
  }
  getGroupsByType(groupTypeAlias: string): Observable<Group[]> {
    throw new Error("Method not implemented.");
  }
  getAll(): Observable<Group[]> {
    return this.http
      .get(`${server}/${version}/${groups.groups}/${global.getAll}`)
      .pipe(map(res => res["data"]));
  }
  getPaged(page?: number, perPage?: number): Observable<Group[]> {
    return this.http
      .get(`${server}/${version}/${groups.groups}/${global.getPaged}`, {
        params: new HttpParams()
          .set("page", page.toString())
          .set("perPage", perPage.toString())
      })
      .pipe(map(res => res["data"]));
  }
  getCount(): Observable<number> {
    return this.http
      .get(`${server}/${version}/${groups.groups}/${global.getCount}`, {
        params: new HttpParams()
      })
      .pipe(map(res => res["data"]));
  }
  addData(group: Group): Observable<any> {
    throw new Error("Method not implemented.");
  }
  editData(group: Group): Observable<any> {
    throw new Error("Method not implemented.");
  }
  deleteData(group: Group[]): Observable<any> {
    throw new Error("Method not implemented.");
  }
}
