import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpEvent
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  server,
  settings,
  files,
  global
} from "src/app/api-endpoints/methodNames";
import version from "./../../version/version";
import { map } from "rxjs/operators";
import Settings from "src/app/enteties/Settings";

@Injectable({
  providedIn: "root"
})
export class FileDataProvider {
  constructor(private http: HttpClient) {}
  getByDirectoryId(directoryId: string): Observable<any> {
    return this.http
      .get(`${server}/${version}/${files.files}/${files.getByDirectoryId}`, {
        params: new HttpParams().set("directoryId", directoryId)
      })
      .pipe(map(res => res["data"]));
  }
  getRootFiles(): Observable<any> {
    return this.http
      .get(`${server}/${version}/${files.files}/${files.getRootFiles}`)
      .pipe(map(res => res["data"]));
  }
  downloadFileById(fileID: string): Observable<any> {
    return this.http.get(
      `${server}/${version}/${files.files}/${files.getFileById}`,
      {
        params: new HttpParams().set("id", fileID),
        responseType: "blob"
      }
    );
  }
  uploadFile(formData: FormData, directoryId: string): Observable<any> {
    return this.http
      .post(
        `${server}/${version}/${files.files}/${files.uploadFile}`,
        formData,
        {
          params: new HttpParams().set("directoryId", directoryId)
        }
      )
      .pipe(map(res => res["status"]));
  }
  delete(fileId: string): Observable<any> {
    return this.http
      .request(
        "delete",
        `${server}/${version}/${files.files}/${global.delete}`,
        {
          params: new HttpParams().set("id", fileId)
        }
      )
      .pipe(map(res => res["status"]));
  }
}
