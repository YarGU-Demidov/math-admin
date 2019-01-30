import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataProvider } from "../DataProvider.abstract";
import Group from "src/app/enteties/Group";

@Injectable({
  providedIn: "root"
})
export abstract class GroupProvider extends DataProvider<Group> {
  abstract getGroupsByType(groupTypeAlias: string): Observable<Group[]>;
}
