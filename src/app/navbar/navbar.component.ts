import { Component, OnInit } from "@angular/core";

import { GlobalApp } from "src/app/utils/globalStoarge";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(public app: GlobalApp) {}

  ngOnInit() {}
}
