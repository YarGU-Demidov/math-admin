import { AbstractDataSource } from "./DataSource.abstract";

import { Professor } from "../enteties/Professor";
import { ProfessorProvider } from "../services/professor-services/ProfessorProvider";
import { MatPaginator } from "@angular/material";

export class ProfessorDataSource extends AbstractDataSource<Professor> {
  constructor(
    private professorProvider: ProfessorProvider,
    public paginator: MatPaginator
  ) {
    super();
  }
  loadProfessors() {}
}
