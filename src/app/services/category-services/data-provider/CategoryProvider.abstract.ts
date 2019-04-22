import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataProvider } from "../../DataProvider.abstract";
import Group from "src/app/enteties/Group";
import Category from "src/app/enteties/Category";

@Injectable({
  providedIn: "root"
})
export abstract class CategoryProvider extends DataProvider<Category> {
  abstract getCategoryByAlias(alias: string): Observable<Category[]>;
}
