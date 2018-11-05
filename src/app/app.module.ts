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
  MatDialogModule,
  MatCheckboxModule
} from "@angular/material";
import { AppComponent } from "./components/app-component/app.component";
import { HomeViewComponent } from "./routes-components/home-view/home-view.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { PersonsTableComponent } from "./routes-components/persons-table/persons-table.component";
import { AppRoutingModule } from "./app-routing.module";
import { GlobalSidebarComponent } from "./components/global-sidebar/global-sidebar.component";
import { PersonProvider } from "./services/person-services/person-provider.abstract";
import { PersonInMemoryDataProviderService } from "./services/person-services/person-in-memory-data-provider/person-in-memory-data-provider.service";
import { UsersTableComponent } from "./routes-components/users-table/users-table.component";
import { UserProvider } from "./services/user-services/user-provider.abstract";
import { UserInMemoryDataProviderService } from "./services/user-services/person-in-memory-data-provider/user-in-memory-provider";
import { EditPersonDialogComponent } from "./routes-components/dialogs/edit-dialog/edit-person-dialog/edit-person-dialog.component";
import { DeletePersonDialogComponent } from "./routes-components/dialogs/delete-dialog/delete-person-dialog/delete-person-dialog.component";
import { AddPersonDialogComponent } from "./routes-components/dialogs/add-dialog/add-person-dialog/add-person-dialog.component";
import { AddUserDialogComponent } from "./routes-components/dialogs/add-dialog/add-user-dialog/add-user-dialog.component";
import { EditUserDialogComponent } from "./routes-components/dialogs/edit-dialog/edit-user-dialog/edit-user-dialog.component";
import { DeleteUserDialogComponent } from "./routes-components/dialogs/delete-dialog/delete-user-dialog/delete-user-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    NavbarComponent,
    PersonsTableComponent,
    GlobalSidebarComponent,
    EditPersonDialogComponent,
    DeletePersonDialogComponent,
    AddPersonDialogComponent,
    UsersTableComponent,
    AddUserDialogComponent,
    EditUserDialogComponent,
    DeleteUserDialogComponent,
    AddUserDialogComponent
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
    MatMomentDateModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: PersonProvider, useClass: PersonInMemoryDataProviderService },
    { provide: UserProvider, useClass: UserInMemoryDataProviderService }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditPersonDialogComponent,
    DeletePersonDialogComponent,
    AddPersonDialogComponent,
    EditUserDialogComponent,
    AddUserDialogComponent,
    DeleteUserDialogComponent
  ]
})
export class AppModule {}
