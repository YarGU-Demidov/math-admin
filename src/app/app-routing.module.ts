import { HomeViewComponent } from "./routes-components/home-view/home-view.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PersonsTableComponent } from "./routes-components/persons-table/persons-table.component";
import { UsersTableComponent } from "./routes-components/users-table/users-table.component";
import { ProfessorsTableComponent } from "./routes-components/professors-table/professors-table.component";
import { AddProfessorComponent } from "./routes-components/add-professor/add-professor.component";
import { EditProfessorComponent } from "./routes-components/edit-professor/edit-professor.component";
const routes: Routes = [
  {
    path: "",
    component: HomeViewComponent
  },
  {
    path: "persons",
    component: PersonsTableComponent
  },
  {
    path: "users",
    component: UsersTableComponent
  },
  {
    path: "professors",
    component: ProfessorsTableComponent
  },
  {
    path: "addProfessors",
    component: AddProfessorComponent
  },
  {
    path: "editProfessor/:id",
    component: EditProfessorComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
