import { of } from "rxjs";
import { finalize, catchError } from "rxjs/operators";
import { MatPaginator } from "@angular/material";
import { AbstractDataSource } from "./DataSource.abstract";
import { User } from "../enteties/User";
import { UserProvider } from "../services/user-services/user-provider.abstract";

export class UserDataSource extends AbstractDataSource<User> {
  constructor(
    private userService: UserProvider,
    public paginator: MatPaginator
  ) {
    super();
  }

  loadUsers() {
    this.loadingSubject.next(true);
    this.userService.getCount().subscribe(res => this.dataCount.next(res));
    this.userService
      .getPaged(this.paginator.pageIndex, this.paginator.pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(users => this.dataSubject.next(users));
  }

  loadUsersByLogin(login: string) {
    this.loadingSubject.next(true);
    this.userService
      .getByLogin(login)
      .pipe<User[], User[]>(
        catchError<User[], User[]>(() => of<User[]>()),
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
