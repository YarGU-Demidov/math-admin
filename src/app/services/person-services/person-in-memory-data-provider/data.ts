import { Person } from "src/app/enteties/Person";

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
    CreationDate: new Date(),
    photoId: "123",
    user: null,
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
    CreationDate: new Date(),
    additionalPhone: "+79445239232",
    photoId: "123",
    isUser: false,
    user: null
  }
];
export function deletePerson(index: number) {
  personList = personList.slice(index, 1);
}
export function getPersons(): Person[] {
  return personList;
}
