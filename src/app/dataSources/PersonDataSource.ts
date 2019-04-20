import { Person } from "../enteties/Person";
import { of } from "rxjs";
import { finalize, catchError } from "rxjs/operators";
import { MatPaginator, MatSort } from "@angular/material";
import { PersonProvider } from "../services/person-services/person-provider.abstract";
import { AbstractDataSource } from "./DataSource.abstract";

export class PersonDataSource extends AbstractDataSource<Person> {
  constructor(
    private personService: PersonProvider,
    public paginator: MatPaginator
  ) {
    super();
  }

  loadPersons() {
    this.loadingSubject.next(true);
    this.personService.getCount().subscribe(res => this.dataCount.next(res));
    this.personService
      .getPaged(this.paginator.pageIndex, this.paginator.pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(persons => this.dataSubject.next(persons));
  }

  loadPersonsBySurname(surname: string) {
    this.loadingSubject.next(true);
    this.personService
      .getBySurname(surname)
      .pipe<Person[], Person[]>(
        catchError<Person[], Person[]>(() => of<Person[]>()),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(data => {
        if (data) {
          this.dataCount.next(data.length);
          this.dataSubject.next(data);
        } else {
          this.dataCount.next(0);
          this.dataSubject.next([]);
        }
      });
  }
}
