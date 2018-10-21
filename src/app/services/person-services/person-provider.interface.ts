import { Observable } from "rxjs";
import { Person } from "src/app/enteties/person";

export default interface IPersonProvider {
  getPersons(
    sortField: string,
    sortOrder: string,
    skip: number,
    take: number
  ): Observable<Person[]>;
  getPersonsCount(): Observable<number>;
  addPreson(person: Person);
  editPerson(newPerson: Person);
  deletePerson(person);
}
