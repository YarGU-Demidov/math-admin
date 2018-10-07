import { Component, OnInit, Output } from '@angular/core';
import { Person } from '../../enteties/person';

@Component({
  selector: 'app-add-persons',
  templateUrl: './add-persons.component.html',
  styleUrls: ['./add-persons.component.css']
})
export class AddPersonsComponent implements OnInit {
	
	@Output()
	public currentPerson: Person;
	
	public calendarLanguage: any;
	public yearRange: string;
	
	public constructor() {
		this.currentPerson    = new Person();
	}
	
	public ngOnInit(): void {
	}
	
	public diagnostic() {
		return JSON.stringify(this.currentPerson);
	}

}
