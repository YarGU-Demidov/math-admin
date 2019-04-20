import { BehaviorSubject, Observable } from "rxjs";
import { DataProvider } from "../services/DataProvider.abstract";
import { DataSource } from "@angular/cdk/table";

export abstract class AbstractDataSource<T> implements DataSource<T> {
  protected dataSubject = new BehaviorSubject<T[]>([]);
  public data: T[];
  protected dataCount = new BehaviorSubject<number>(0);
  public loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public dataCount$ = this.dataCount.asObservable();

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
