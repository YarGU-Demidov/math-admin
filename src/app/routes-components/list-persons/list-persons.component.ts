import { Component, Input, OnInit } from "@angular/core";
import { TableDataSource, TableElement } from "angular4-material-table";
import { PersonDataProviderService } from "src/app/services/persons-data-provider/person-data-provider.service";
import { Person } from "src/app/enteties/person";
import { PersonValidatorService } from "src/app/services/person-validator/person-validator.service";
import phoneMask from "../../constants/masks/phone-mask";
import { MergePhoneWithMaskService } from "src/app/services/merge-phone-with-mask/merge-phone-with-mask.service";

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
  dataSource: TableDataSource<Person>;
  @Input()
  personsList: Person[];
  phoneMask = phoneMask;

  constructor(
    private personValidator: PersonValidatorService,
    private mergePhoneWithMaskService: MergePhoneWithMaskService,
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
    const personsList = this.personsProvider.getPersons();
    personsList.forEach((person: Person) => {
      if (person.phone !== null)
        person.phone = this.mergePhoneWithMaskService.mergeWithPhoneMask(
          person.phone
        );
      person.additionalPhone = this.mergePhoneWithMaskService.mergeWithPhoneMask(
        person.additionalPhone
      );
    });
    this.personsList = personsList;
    this.dataSource.updateDatasource(this.personsList);
  }
  ngOnInit() {
    this.dataSource = new TableDataSource<any>(
      [],
      Person,
      this.personValidator
    );
    this.updateDataSource();
  }
}
