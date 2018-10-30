import { Person } from "src/app/enteties/person";

let personList: Person[] = [
  {
    id: "1",
    name: "Bob",
    middleName: "Firsy",
    surname: "Bobchinsky",
    phone: "+79445239212",
    additionalPhone: "+79445239232",
    email: "test1@mail.com",
    birthday: new Date(),
    creationDate: "232323",
    photoId: "2424",
    isUser: false
  },
  {
    id: "2",
    name: "Tom",
    surname: "Tomson",
    phone: "+79445239223",
    middleName: "Firsy",
    email: "test2@mail.com",
    birthday: new Date(),
    creationDate: "232323",
    photoId: "2424",
    isUser: false,
    additionalPhone: "+79445239232"
  }
];
export function deletePerson(index: number) {
  personList = personList.slice(index, 1);
}
export function getPersons(): Person[] {
  return personList;
}
