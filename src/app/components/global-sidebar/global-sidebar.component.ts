import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-global-sidebar',
  templateUrl: './global-sidebar.component.html',
  styleUrls: ['./global-sidebar.component.css']
})
export class GlobalSidebarComponent implements OnInit {

  @Input() listOfRoutes: [{ route: string, text: string }]
  constructor() {
   }

  ngOnInit() {
  }

}
