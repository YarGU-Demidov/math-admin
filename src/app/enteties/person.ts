import { User } from "./User";
export class Person {
  public id: string = null;
  public name: string = null;
  public surname: string = null;
  public middleName: string = null;
  public phone: string = null;
  public email: string = null;
  public additionalPhone: string = null;
  public birthday: Date = null;
  public creationDate: string = null;
  public photoId: string = null;
  public user: User = null;
  get isUser(): boolean {
    if (this.user) return true;
    return false;
  }
  public toString = (): string => {
    return `${this.surname} ${this.name}`;
  };
  constructor(name?: string, surname?: string, id?: string) {
    this.name = name;
    this.surname = surname;
    this.id = id;
  }
}
