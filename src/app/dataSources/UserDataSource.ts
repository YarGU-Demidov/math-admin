import { of } from "rxjs";
import { finalize, catchError } from "rxjs/operators";
import { MatPaginator, MatSort } from "@angular/material";
import { AbstractDataSource } from "./DataSource.abstract";
import { User } from "../enteties/User";
import { UserProvider } from "../services/user-services/user-provider.abstract";

export class UserDataSource extends AbstractDataSource<User> {
  constructor(
    private userService: UserProvider,
    public paginator: MatPaginator,
    public sort: MatSort
  ) {
    super();
  }

  loadPersons() {
    this.loadingSubject.next(true);
    this.userService.getUsersCount().subscribe(res => this.dataCount.next(res));
    this.userService
      .getUsers(this.sort.active, this.sort.direction)
      .pipe(
        catchError(() => of([])),
        finalize(() => setTimeout(() => this.loadingSubject.next(false), 1000))
      )
      .subscribe(persons =>
        setTimeout(() => this.dataSubject.next(persons), 1000)
      );
  }
}
