import { DataProvider } from "../DataProvider.abstract";
import { Professor } from "src/app/enteties/Professor";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { server, settings } from "src/app/api-endpoints/methodNames";
import version from "./../../version/version";
import { map } from "rxjs/operators";
import Settings from "src/app/enteties/Settings";

@Injectable({
  providedIn: "root"
})
export class FilesDataProvider {
  constructor(private http: HttpClient) {}
  addSettings(data: Settings): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http
      .post(
        `${server}/${version}/${settings.settings}/${settings.setSettings}`,
        this.settingsToSettingsDto(data),
        { headers }
      )
      .pipe(map(res => res["status"]));
  }
  getFilesByDirectoryId(id: string): Observable<Settings> {
    return this.http
      .get(
        `${server}/${version}/${settings.settings}/${settings.getSettings}`,
        {
          params: new HttpParams().set("path", id)
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
