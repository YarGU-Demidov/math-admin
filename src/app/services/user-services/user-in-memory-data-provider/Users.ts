import { User } from "src/app/enteties/User";

let userList: User[] = [
  {
    id: "2",
    login: "1",
    password: "Bob",
    personId: "Firsy",
    group: null,
    creationDate: new Date(),
    person: null,
    snm: null
  }
];
export function deleteUser(index: number) {
  userList = userList.slice(index, 1);
}
export function getUsers(): User[] {
  return userList;
}
