import { Person } from "./Person";

export class User {
  public login: string = null;
  public password: string = null;
  public personId: string = null;
  public groupId: string = null;
  public creationDate: Date = null;
  public person: Person = null;
  get snm(): string {
    return `${this.person.surname} ${this.person.name} ${
      this.person.middleName
    }`;
  }
}
