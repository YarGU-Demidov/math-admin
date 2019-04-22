import { of } from "rxjs";
import { finalize, catchError } from "rxjs/operators";
import { MatPaginator } from "@angular/material";
import { AbstractDataSource } from "./DataSource.abstract";
import Category from "../enteties/Category";
import { CategoryProvider } from "../services/category-services/data-provider/CategoryProvider.abstract";

export class CategoryDataSource extends AbstractDataSource<Category> {
  constructor(
    private categoryService: CategoryProvider,
    public paginator: MatPaginator
  ) {
    super();
  }

  loadCategories() {
    this.loadingSubject.next(true);
    this.categoryService.getCount().subscribe(res => this.dataCount.next(res));
    this.categoryService
      .getPaged(this.paginator.pageIndex, this.paginator.pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(users => this.dataSubject.next(users));
  }

  loadCategoriesByAlias(aliase: string) {
    this.loadingSubject.next(true);
    this.categoryService
      .getCategoryByAlias(aliase)
      .pipe<Category[], Category[]>(
        catchError<Category[], Category[]>(() => of<Category[]>()),
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
