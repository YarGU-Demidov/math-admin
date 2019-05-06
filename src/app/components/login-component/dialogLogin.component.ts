import { Component, OnInit, Inject } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { LoginProvider } from "src/app/services/auth-service/LoginProvider";

@Component({
  selector: "app-dialog-login",
  templateUrl: "app-dialog-login.html"
})
export class DialogLogin {
  formGroup: FormGroup;
  public loginValid: boolean = true;
  public errorText: string;
  constructor(
    public dialogRef: MatDialogRef<DialogLogin>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loginService: LoginProvider
  ) {
    this.formGroup = new FormGroup({
      login: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  onComplete(): void {
    this.loginService
      .login(
        this.formGroup.controls["login"].value,
        this.formGroup.controls["password"].value
      )
      .subscribe(
        response => {
          if (response.status === "ok") {
            let token = response.data.token;
            const login = response.data.login;
            this.loginValid = true;
            this.dialogRef.close({ token, login });
          } else {
            this.loginValid = false;
            this.errorText = "Login or password are incorrect";
          }
        },
        err => {
          this.loginValid = false;
          this.errorText = err;
        }
      );
  }
}
