import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { UserProvider } from "../user-provider.abstract";
import { getUsers, deleteUser } from "./Users";
import { User } from "src/app/enteties/User";

@Injectable({
  providedIn: "root"
})
export class UserInMemoryDataProvider extends UserProvider {
  constructor() {
    super();
  }
  getByLogin(login: string): Observable<User[]> {
    return;
  }
  getAll(): Observable<User[]> {
    let userList = getUsers();
    for (let i = 1; i < userList.length; i++) {
      let temp = userList[i];
      userList[i] = userList[i - 1];
      userList[i - 1] = temp;
    }
    return of(userList);
  }
  getPaged(page?: number, perPage?: number): Observable<User[]> {
    return this.getAll();
  }
  getCount(): Observable<number> {
    return of(Math.round(Math.random() * 10));
  }
  getUsersCount() {}
  addData(user: User): Observable<any> {
    console.log(`user added ${user}`);
    getUsers().push(user);
    return;
  }
  editData(newUser: User): Observable<any> {
    console.log(`user edited ${newUser}`);
    const data = getUsers();
    const index = data.findIndex(user => user.login == newUser.login);
    data[index] = newUser;
    return;
  }
  deleteData(data: User[]): Observable<any> {
    console.log(`users deleted ${data}`);
    return;
  }
}
