import { Person } from "./Person";
import Entity from "./Entity";
import Group from "./Group";

export class User extends Entity<string> {
  public login: string = null;
  public password: string = null;
  public personId: string = null;
  public group: Group = null;
  public person: Person = null;
  //Surname Name Middlename
  get snm(): string {
    return `${this.person.surname} ${this.person.name} ${
      this.person.middleName
    }`;
  }
}
