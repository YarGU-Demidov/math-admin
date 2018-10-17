import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TextMaskModule } from "angular2-text-mask";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {
  MatDatepickerModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule
} from "@angular/material";
import { AppComponent } from "./components/app-component/app.component";
import { HomeViewComponent } from "./components/home-view/home-view.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { PersonsControllerComponent } from "./routes/persons-controller/persons-controller.component";
import { ListPersonsComponent } from "./routes-components/list-persons/list-persons.component";
import { AddPersonsComponent } from "./routes-components/add-persons/add-persons.component";
import { AppRoutingModule } from "./app-routing.module";
import { GlobalSidebarComponent } from "./components/global-sidebar/global-sidebar.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    NavbarComponent,
    PersonsControllerComponent,
    ListPersonsComponent,
    AddPersonsComponent,
    GlobalSidebarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatListModule,
    MatInputModule,
    ReactiveFormsModule,
    TextMaskModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
