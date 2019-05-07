import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { server, auth } from "src/app/api-endpoints/methodNames";
import version from "src/app/version/version";

@Injectable({
  providedIn: "root"
})
export class LoginProvider {
  constructor(private http: HttpClient) {}
  login(login: string, password: string): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(
      `${server}/${version}/${auth.auth}/${
        auth.login
      }?login=${login}&password=${password}`,
      {},
      { headers }
    );
  }
}
