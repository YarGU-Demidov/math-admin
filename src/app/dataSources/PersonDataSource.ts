import { Person } from "../enteties/Person";
import { of } from "rxjs";
import { finalize, catchError } from "rxjs/operators";
import { MatPaginator, MatSort } from "@angular/material";
import { PersonProvider } from "../services/person-services/person-provider.abstract";
import { AbstractDataSource } from "./DataSource.abstract";

export class PersonDataSource extends AbstractDataSource<Person> {
  filterName: string;
  filterSurname: string;

  constructor(
    private personService: PersonProvider,
    public paginator: MatPaginator,
    public sort: MatSort
  ) {
    super();
  }

  loadPersons() {
    this.loadingSubject.next(true);
    this.personService
      .getPersonsCount()
      .subscribe(res => this.dataCount.next(res));
    this.personService
      .getPersons(this.sort.active, this.sort.direction)
      .pipe(
        catchError(() => of([])),
        finalize(() => setTimeout(() => this.loadingSubject.next(false), 1000))
      )
      .subscribe(persons =>
        setTimeout(() => this.dataSubject.next(persons), 1000)
      );
  }
}
