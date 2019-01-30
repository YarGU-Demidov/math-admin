import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "src/app/enteties/User";
import version from "./../../../version/version";
import { global, users, server } from "./../../../api-endpoints/methodNames";
import { GroupProvider } from "../GroupProvider.abstract";
import Group from "src/app/enteties/Group";

@Injectable({
  providedIn: "root"
})
export class UserHttpDataProvider extends GroupProvider {
  constructor(private http: HttpClient) {
    super();
  }
  getGroupsByType(groupTypeAlias: string): Observable<Group[]> {
    throw new Error("Method not implemented.");
  }
  getAll(): Observable<Group[]> {
    return this.http
      .get(`${server}/${version}/${users.users}/${global.getAll}`)
      .pipe(map(res => res["data"]));
  }
  getPaged(page?: number, perPage?: number): Observable<Group[]> {
    return this.http
      .get(`${server}/${version}/${users.users}/${global.getPagedWithPerson}`, {
        params: new HttpParams()
          .set("page", page.toString())
          .set("perPage", perPage.toString())
      })
      .pipe(map(res => res["data"]));
  }
  getCount(): Observable<number> {
    return this.http
      .get(`${server}/${version}/${users.users}/${global.getCount}`, {
        params: new HttpParams()
      })
      .pipe(map(res => res["data"]));
  }
  addData(group: Group): void {
    throw new Error("Method not implemented.");
  }
  editData(group: Group): void {
    throw new Error("Method not implemented.");
  }
  deleteData(group: Group[]): void {
    throw new Error("Method not implemented.");
  }
}
