import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataProvider } from "../DataProvider.abstract";
import { User } from "src/app/enteties/User";

@Injectable({
  providedIn: "root"
})
export abstract class UserProvider implements DataProvider {
  abstract getUsers(
    sortField: string,
    sortOrder: string,
    skip?: number,
    take?: number
  ): Observable<User[]>;
  abstract getUsersCount(): Observable<number>;
  abstract addUser(user: User);
  abstract editUser(newUser: User);
  abstract deleteUser(login: string);
}
