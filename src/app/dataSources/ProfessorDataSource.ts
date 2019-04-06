import { AbstractDataSource } from "./DataSource.abstract";

import { Professor } from "../enteties/Professor";
import { ProfessorDataProvider } from "../services/professor-services/ProfessorDataProvider";
import { MatPaginator } from "@angular/material";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs";

export class ProfessorDataSource extends AbstractDataSource<Professor> {
  constructor(
    private professorProvider: ProfessorDataProvider,
    public paginator: MatPaginator
  ) {
    super();
  }
  loadProfessors() {
    setTimeout(() => this.loadingSubject.next(true), 0);
    this.professorProvider
      .getCount()
      .subscribe(res => this.dataCount.next(res));
    this.professorProvider
      .getPaged(this.paginator.pageIndex, this.paginator.pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(professors => this.dataSubject.next(professors));
  }
  loadProfessorsBySurname(surname: string): any {
    setTimeout(() => this.loadingSubject.next(true), 0);
    this.professorProvider
      .getAllBySurname(surname)
      .pipe<Professor[], Professor[]>(
        catchError<Professor[], Professor[]>(() => of<Professor[]>()),
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
