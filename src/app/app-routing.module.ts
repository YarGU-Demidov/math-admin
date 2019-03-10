import { HomeViewComponent } from "./routes-components/home-view/home-view.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PersonsTableComponent } from "./routes-components/persons-table/persons-table.component";
import { UsersTableComponent } from "./routes-components/users-table/users-table.component";
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
