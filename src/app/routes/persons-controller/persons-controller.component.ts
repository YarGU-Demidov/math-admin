import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-persons-controller',
  templateUrl: './persons-controller.component.html',
  styleUrls: ['./persons-controller.component.css']
})
export class PersonsControllerComponent implements OnInit {

  listOfRoutes = [{
    route: "list",
    text: "Список пользователей."
  },
  {
    route:"add",
    text:"Добавить пользователя."
  }]
  constructor() { }

  ngOnInit() {
  }

}
