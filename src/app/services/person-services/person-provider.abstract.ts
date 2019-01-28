import { Observable } from "rxjs";
import { Person } from "src/app/enteties/Person";
import { Injectable } from "@angular/core";
import { DataProvider } from "../DataProvider.abstract";

@Injectable({
  providedIn: "root"
})
export abstract class PersonProvider extends DataProvider<Person> {}
