import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { UserProvider } from "../user-provider.abstract";
import { getUsers, deleteUser } from "./Users";
import { User } from "src/app/enteties/User";

@Injectable({
  providedIn: "root"
})
export class UserInMemoryDataProviderService extends UserProvider {
  constructor() {
    super();
  }

  getUsers(
    sortField: string,
    sortOrder: string,
    skip: number = 0,
    take: number = 5
  ) {
    let userList = getUsers();
    for (let i = 1; i < userList.length; i++) {
      let temp = userList[i];
      userList[i] = userList[i - 1];
      userList[i - 1] = temp;
    }
    return of(userList);
  }
  getUsersCount() {
    return of(Math.round(Math.random() * 10));
  }
  addUser(user: User) {
    getUsers().push(user);
  }
  editUser(newUser: User) {
    const data = getUsers();
    const index = data.findIndex(user => user.login == newUser.login);
    data[index] = newUser;
  }
  deleteUser(login: string) {
    const index = getUsers().findIndex(user => user.login == login);
    deleteUser(index);
  }
  deletePerson(login: string) {}
}
