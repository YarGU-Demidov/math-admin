import { BehaviorSubject, Observable } from "rxjs";
import { DataProvider } from "../services/DataProvider.abstract";
import { DataSource } from "@angular/cdk/table";

export abstract class AbstractDataSource<T> implements DataSource<T> {
  protected dataSubject = new BehaviorSubject<T[]>([]);
  public data: T[];
  protected dataCount = new BehaviorSubject<number>(0);
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  public dataCount$ = this.dataCount.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor() {
    this.dataSubject.asObservable().subscribe(data => (this.data = data));
  }

  connect(): Observable<T[]> {
    return this.dataSubject.asObservable();
  }
  disconnect(): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }
}
