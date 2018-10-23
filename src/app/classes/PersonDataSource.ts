import { DataSource } from "@angular/cdk/table";
import { Person } from "../enteties/person";
import { BehaviorSubject, Observable, of, merge } from "rxjs";
import { PersonInMemoryDataProviderService } from "../services/person-services/person-in-memory-data-provider/person-in-memory-data-provider.service";
import { map, finalize, catchError } from "rxjs/operators";
import { MatPaginator, MatSort } from "@angular/material";
export class PersonDataSource implements DataSource<Person> {
  private personsSubject = new BehaviorSubject<Person[]>([]);

  private filteredPersonsNumber = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public personsNumber$ = this.filteredPersonsNumber.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private personService: PersonInMemoryDataProviderService,
    public paginator: MatPaginator,
    public sort: MatSort
  ) {}

  connect(): Observable<Person[]> {
    return this.personsSubject.asObservable();
  }
  disconnect(): void {
    this.personsSubject.complete();
    this.loadingSubject.complete();
  }
  loadPersons() {
    this.loadingSubject.next(true);
    this.personService
      .getPersonsCount()
      .subscribe(res => this.filteredPersonsNumber.next(res));
    this.personService
      .getPersons(this.sort.active, this.sort.direction)
      .pipe(
        catchError(() => of([])),
        finalize(() => setTimeout(() => this.loadingSubject.next(false), 1000))
      )
      .subscribe(persons =>
        setTimeout(() => this.personsSubject.next(persons), 1000)
      );
  }
}
