import { DataProvider } from "../DataProvider.abstract";
import { Professor } from "src/app/enteties/Professor";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ProfessorProvider extends DataProvider<Professor> {
  addData(data: Professor): import("rxjs").Observable<any> {
    throw new Error("Method not implemented.");
  }
  editData(newData: Professor): import("rxjs").Observable<any> {
    throw new Error("Method not implemented.");
  }
  deleteData(data: Professor[]): import("rxjs").Observable<any> {
    throw new Error("Method not implemented.");
  }
  getAll(): import("rxjs").Observable<Professor[]> {
    throw new Error("Method not implemented.");
  }
  getPaged(
    page?: number,
    perPage?: number
  ): import("rxjs").Observable<Professor[]> {
    throw new Error("Method not implemented.");
  }
  getCount(): import("rxjs").Observable<number> {
    throw new Error("Method not implemented.");
  }
  constructor(private http: HttpClient) {
    super();
  }
}
