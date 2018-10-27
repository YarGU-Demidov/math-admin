import { HomeViewComponent } from "./routes-components/home-view/home-view.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ListPersonsComponent } from "./routes-components/list-persons/list-persons.component";
const routes: Routes = [
  {
    path: "",
    component: HomeViewComponent,
    children: []
  },
  {
    path: "persons",
    component: ListPersonsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
