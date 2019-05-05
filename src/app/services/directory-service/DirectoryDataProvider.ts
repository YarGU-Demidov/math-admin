import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  server,
  settings,
  directories,
  global
} from "src/app/api-endpoints/methodNames";
import version from "./../../version/version";
import { map } from "rxjs/operators";
import Directory from "src/app/enteties/Directory";

@Injectable({
  providedIn: "root"
})
export class DirectoryDataProiver {
  deleteDirectory(id: string): Observable<any> {
    return this.http
      .delete(
        `${server}/${version}/${directories.directories}/${global.delete}`,
        {
          params: new HttpParams().set("Id", id)
        }
      )
      .pipe(map(res => res["status"]));
  }
  addNewDirectory(parentId: string, directoryName: string) {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http
      .post(
        `${server}/${version}/${directories.directories}/${global.create}`,
        {
          Name: directoryName,
          RootDirectoryId: parentId
        },
        { headers }
      )
      .pipe(map(res => res["status"]));
  }
  constructor(private http: HttpClient) {}
  getChildDirectories(parentId: string): Observable<Directory[]> {
    return this.http
      .get(
        `${server}/${version}/${directories.directories}/${
          directories.getChildDirectories
        }`,
        {
          params: new HttpParams().set("parentId", parentId)
        }
      )
      .pipe(map(res => res["data"]));
  }
  getRootDirectories(): Observable<Directory[]> {
    return this.http
      .get(
        `${server}/${version}/${directories.directories}/${
          directories.getRootDirectories
        }`
      )
      .pipe(map(res => res["data"]));
  }
}
