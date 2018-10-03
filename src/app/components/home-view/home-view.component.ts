import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent {
	
	private pageTitle: string = 'Пользовательская Панель';
	
	public name: string;
	@ViewChild('homeView')
	public homeView: ElementRef;

	constructor(){
		this.name = "Dmitry"
	}
}
