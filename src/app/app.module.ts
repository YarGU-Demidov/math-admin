import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TextMaskModule } from "angular2-text-mask";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { HttpClientModule } from "@angular/common/http";
import {
  MatDatepickerModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatCardModule,
  MatDialogModule
} from "@angular/material";
import { AppComponent } from "./components/app-component/app.component";
import { HomeViewComponent } from "./components/home-view/home-view.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { PersonsControllerComponent } from "./routes/persons-controller/persons-controller.component";
import { ListPersonsComponent } from "./routes-components/list-persons/list-persons.component";
import { AddPersonsComponent } from "./routes-components/add-persons/add-persons.component";
import { AppRoutingModule } from "./app-routing.module";
import { GlobalSidebarComponent } from "./components/global-sidebar/global-sidebar.component";
import { EditPersonDialogComponent } from "./routes-components/list-persons/dialogs/edit-person-dialog/edit-person-dialog.component";
import { DeletePersonDialogComponent } from "./routes-components/list-persons/dialogs/delete-person-dialog/delete-person-dialog.component";
import { PersonHttpDataProviderService } from "./services/person-services/person-http-data-provider/person-http-data-provider.service";
import { PersonProvider } from "./services/person-services/person-provider.abstract";
import { PersonInMemoryDataProviderService } from "./services/person-services/person-in-memory-data-provider/person-in-memory-data-provider.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    NavbarComponent,
    PersonsControllerComponent,
    ListPersonsComponent,
    AddPersonsComponent,
    GlobalSidebarComponent,
    EditPersonDialogComponent,
    DeletePersonDialogComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatDialogModule,
    HttpClientModule,
    MatSortModule,
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
  providers: [
    { provide: PersonProvider, useClass: PersonInMemoryDataProviderService }
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditPersonDialogComponent, DeletePersonDialogComponent]
})
export class AppModule {}
