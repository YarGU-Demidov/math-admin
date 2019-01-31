import { User } from "src/app/enteties/User";

let userList: User[] = [
  {
    Id: "2",
    Login: "1",
    Password: "Bob",
    PersonId: "Firsy",
    Group: "Bobchinsky",
    CreationDate: new Date(),
    Person: null,
    snm: null
  }
];
export function deleteUser(index: number) {
  userList = userList.slice(index, 1);
}
export function getUsers(): User[] {
  return userList;
}
