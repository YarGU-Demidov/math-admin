import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { TableDataSource, TableElement } from "angular4-material-table";
import { PersonDataProviderService } from "src/app/services/persons-data-provider/person-data-provider.service";
import { Person } from "src/app/enteties/person";
import { PersonValidatorService } from "src/app/services/person-validator/person-validator.service";
import { MergePhoneWithMaskService } from "src/app/services/merge-phone-with-mask/merge-phone-with-mask.service";
import { MatPaginator } from "@angular/material/paginator";
import { tap, map } from "rxjs/operators";
import { merge } from "rxjs";
import { MatSort } from "@angular/material";

@Component({
  selector: "app-list-persons",
  templateUrl: "./list-persons.component.html",
  styleUrls: ["./list-persons.component.css", "./person-list.component.scss"]
})
export class ListPersonsComponent implements OnInit {
  columnsToDisplay: string[] = [
    "name",
    "surname",
    "middleName",
    "email",
    "phone",
    "additionalPhone",
    "birthday",
    "actionsColumn"
  ];
  dataSource: TableDataSource<Person>;
  totalNumberOfPersons: number;
  personsList: Person[];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

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
    this.totalNumberOfPersons = this.personsProvider.getPersonsCount();
    const personsList = this.personsProvider.getPersons(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );

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
    this.dataSource = new TableDataSource<Person>(
      [],
      Person,
      this.personValidator
    );
    this.updateDataSource();
  }
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.updateDataSource()))
      .subscribe();
  }
}
