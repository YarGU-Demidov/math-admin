import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import {
  TableDataSource,
  ValidatorService,
  TableElement
} from "angular4-material-table";
import { PersonDataProviderService } from "src/app/services/persons-data-provider/person-data-provider.service";
import { Person } from "src/app/enteties/person";
import { PersonValidatorService } from "src/app/services/person-validator/person-validator.service";

@Component({
  selector: "app-list-persons",
  templateUrl: "./list-persons.component.html",
  styleUrls: ["./list-persons.component.css", "./person-list.component.scss"]
})
export class ListPersonsComponent implements OnInit {
  columnsToDisplay: string[] = [
    "name",
    "surname",
    "middlename",
    "email",
    "phone",
    "additionalPhone",
    "birthday",
    "actionsColumn"
  ];
  allColumns: { key: string; header: string }[] = [
    { key: "name", header: "Имя" },
    { key: "surname", header: "Фамилия" },
    { key: "middlename", header: "Отчество" },
    {
      key: "email",
      header: "Почта"
    },
    {
      key: "phone",
      header: "Телефон"
    },
    {
      key: "additionalPhone",
      header: "Доп. телефон"
    },
    {
      key: "birthday",
      header: "День рождения"
    }
  ];
  dataSource: TableDataSource<Person>;
  @Input()
  personsList: Person[];

  constructor(
    private personValidator: PersonValidatorService,
    private personsProvider: PersonDataProviderService
  ) {}

  confirmEdit(row: TableElement<Person>) {
    const editingValid: boolean = row.confirmEditCreate();
    if (editingValid) {
      this.personsProvider.editPerson(row.currentData);
    }
    this.updateDataSource();
  }
  cancelOrDelete(row: TableElement<Person>) {
    if (!row.editing) {
      this.personsProvider.deletePerson(row.currentData);
    }
    row.cancelOrDelete();
    this.updateDataSource();
  }
  private updateDataSource() {
    this.personsList = this.personsProvider.getPersons();
    this.dataSource.updateDatasource(this.personsList);
  }
  ngOnInit() {
    this.personsList = this.personsProvider.getPersons();
    this.dataSource = new TableDataSource<any>(
      this.personsList,
      Person,
      this.personValidator
    );
  }
}
