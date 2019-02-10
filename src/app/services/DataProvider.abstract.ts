import { Observable } from "rxjs";

export abstract class DataProvider<T> {
  abstract addData(data: T): Observable<any>;
  abstract editData(newData: T): Observable<any>;
  abstract deleteData(data: T[]): Observable<any>;
  abstract getAll(): Observable<T[]>;
  abstract getPaged(page?: number, perPage?: number): Observable<T[]>;
  abstract getCount(): Observable<number>;
}
