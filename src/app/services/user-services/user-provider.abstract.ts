import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataProvider } from "../DataProvider.abstract";
import { User } from "src/app/enteties/User";

@Injectable({
  providedIn: "root"
})
export abstract class UserProvider extends DataProvider<User> {
  abstract getByLogin(login: string): Observable<User[]>;
}
