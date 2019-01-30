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

  loadUsers() {
    setTimeout(() => this.loadingSubject.next(true), 0);
    this.userService.getCount().subscribe(res => this.dataCount.next(res));
    this.userService
      .getPaged(this.paginator.pageIndex, this.paginator.pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(users => this.dataSubject.next(users));
  }

  loadUserByLogin(login: string) {
    setTimeout(() => this.loadingSubject.next(true), 0);
    this.userService
      .getByLogin(login)
      .pipe<User, User>(
        catchError<User, User>(() => of<User>()),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(user => {
        if (user) {
          this.dataCount.next(1);
          this.dataSubject.next([user]);
        } else {
          this.dataCount.next(0);
          this.dataSubject.next([]);
        }
      });
  }
}
