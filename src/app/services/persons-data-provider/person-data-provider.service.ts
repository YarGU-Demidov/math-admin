import { Injectable } from "@angular/core";
import { Person } from "src/app/enteties/person";

@Injectable({
  providedIn: "root"
})
export class PersonDataProviderService {
  private data: Person[];
  constructor() {
    this.data = [new Person("test", "testov"), new Person("second", "person")];
  }

  getPersons(): Person[] {
    return this.data;
  }

  addPreson(person: Person) {
    this.data.push(person);
  }
  editPerson(newPerson: Person) {
    this.data.forEach(existingPerson => {
      if (existingPerson.id === newPerson.id) {
        existingPerson = newPerson;
      }
    });
  }
  deletePerson(person) {
    for (var i = this.data.length - 1; i >= 0; i--) {
      if (this.data[i].id === person.id) {
        this.data.splice(i, 1);
      }
    }
  }
}
