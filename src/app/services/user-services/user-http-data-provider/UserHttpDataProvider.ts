import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { UserProvider } from "../user-provider.abstract";
import { User } from "src/app/enteties/User";
import version from "./../../../version/version";
import { global, users, server } from "./../../../api-endpoints/methodNames";

@Injectable({
  providedIn: "root"
})
export class UserHttpDataProvider extends UserProvider {
  constructor(private http: HttpClient) {
    super();
  }
  getByLogin(login: string): Observable<User> {
    return this.http
      .get(`${server}/${version}/${users.users}/${users.getByLogin}`, {
        params: new HttpParams().set("login", login)
      })
      .pipe(map(res => res["data"]));
  }
  getAll(): Observable<User[]> {
    return this.http
      .get(`${server}/${version}/${users.users}/${global.getAll}`)
      .pipe(map(res => res["data"]));
  }
  getPaged(page?: number, perPage?: number): Observable<User[]> {
    return this.http
      .get(`${server}/${version}/${users.users}/${users.getPagedWithPerson}`, {
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
  addData(user: User): Observable<any> {
    return this.http
      .post(`${server}/${version}/${users.users}/${global.create}`, user)
      .pipe(map(res => res["status"]));
  }
  editData(newUser: User): void {
    throw new Error("Method not implemented.");
  }
  deleteData(users: User[]): void {
    throw new Error("Method not implemented.");
  }
}
