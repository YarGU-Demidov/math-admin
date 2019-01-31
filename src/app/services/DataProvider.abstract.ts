import { Observable } from "rxjs";

export abstract class DataProvider<T> {
  abstract addData(data: T): Observable<any>;
  abstract editData(newData: T): void;
  abstract deleteData(data: T[]): void;
  abstract getAll(): Observable<T[]>;
  abstract getPaged(page?: number, perPage?: number): Observable<T[]>;
  abstract getCount(): Observable<number>;
}
