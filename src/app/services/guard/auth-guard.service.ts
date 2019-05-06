import { Injectable } from "@angular/core";

import { CanActivate } from "@angular/router/src/utils/preactivation";

import { Router, ActivatedRouteSnapshot } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(private router: Router) {}
  canActivate() {
    var token = localStorage.getItem("jwt");
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    if (!decodedToken) {
      this.router.navigate(["login"]);
      return false;
    }
    const role =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    if (token && !helper.isTokenExpired(token) && role === "admin") {
      localStorage.setItem("role", role);
      return true;
    }
    if (helper.isTokenExpired(token)) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("role");
    }
    this.router.navigate(["login"]);
    return false;
  }
}
