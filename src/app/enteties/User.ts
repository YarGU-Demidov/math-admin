import { Person } from "./Person";
import Entity from "./Entity";

export class User extends Entity<string> {
  public Login: string = null;
  public Password: string = null;
  public PersonId: string = null;
  public Group: string = null;
  public Person: Person = null;
  //Surname Name Middlename
  get snm(): string {
    return `${this.Person.surname} ${this.Person.name} ${
      this.Person.middleName
    }`;
  }
}
