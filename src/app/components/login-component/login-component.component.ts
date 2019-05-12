import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { DialogLogin } from "./dialogLogin.component";

@Component({
  selector: "app-login-component",
  templateUrl: "./login-component.component.html",
  styleUrls: ["./login-component.component.css"]
})
export class LoginComponent {
  constructor(private router: Router, public dialog: MatDialog) {
    const dialogRef = this.dialog.open(DialogLogin);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.setItem("jwt", result.token);
        localStorage.setItem("login", result.login);
      }
      this.router.navigate(["/"]);
    });
  }
}
