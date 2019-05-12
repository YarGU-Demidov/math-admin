import { HomeViewComponent } from "./routes-components/home-view/home-view.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PersonsTableComponent } from "./routes-components/persons-table/persons-table.component";
import { UsersTableComponent } from "./routes-components/users-table/users-table.component";
import { ProfessorsTableComponent } from "./routes-components/professors-table/professors-table.component";
import { AddProfessorComponent } from "./routes-components/add-professor/add-professor.component";
import { EditProfessorComponent } from "./routes-components/edit-professor/edit-professor.component";
import { CategoriesTableComponent } from "./routes-components/categories-table/categories-table.component";
import { SettingsComponent } from "./routes-components/settings/settings.component";
import { TreeComponent } from "./routes-components/tree/tree.component";
import { LoginComponent } from "./components/login-component/login-component.component";
import { AuthGuard } from "./services/guard/auth-guard.service";
import { LogoutComponent } from "./components/logout/logout.component";
const routes: Routes = [
  {
    path: "",
    component: HomeViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "persons",
    component: PersonsTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "users",
    component: UsersTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "professors",
    component: ProfessorsTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "categories",
    component: CategoriesTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addProfessors",
    component: AddProfessorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "settings",
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "files",
    component: TreeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "editProfessor/:id",
    component: EditProfessorComponent,
    canActivate: [AuthGuard],
    children: []
  },
  {
    path: "login",
    component: LoginComponent,
    children: []
  },
  {
    path: "logout",
    component: LogoutComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
