import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { server, settings, files } from "src/app/api-endpoints/methodNames";
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
  getDirectoriesByPath(path: string): Observable<Settings> {
    return this.http
      .get(
        `${server}/${version}/${settings.settings}/${settings.getSettings}`,
        {
          params: new HttpParams().set("path", path)
        }
      )
      .pipe(map(res => res["data"]));
  }
  private settingsToSettingsDto(data: Settings): any {
    return {
      DefaultTitleForHomePage: data.defaultTitleForHomePage,
      DefaultTitleForNewsPage: data.defaultTitleForNewsPage,
      PerPageCount: data.perPageCount,
      SiteName: data.siteName,
      TitleDelimiter: data.titleDelimiter
    };
  }
}
