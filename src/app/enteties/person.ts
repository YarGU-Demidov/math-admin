import { User } from "./User";
import Entity from "./Entity";
export class Person extends Entity<string> {
  public name: string = null;
  public surname: string = null;
  public middleName: string = null;
  public phone: string = null;
  public email: string = null;
  public additionalPhone: string = null;
  public birthday: Date = null;
  public photoId: string = null;
  public user: User = null;
  get isUser(): boolean {
    if (this.user) return true;
    return false;
  }
  toString(): string {
    return this.name + " " + this.surname;
  }
  constructor(name?: string, surname?: string, id?: string) {
    super();
    this.name = name;
    this.surname = surname;
    this.id = id;
  }
}
