import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TextMaskModule } from "angular2-text-mask";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgxTinymceModule } from "ngx-tinymce";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTabsModule } from "@angular/material/tabs";
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
  MatCheckboxModule,
  MatAutocompleteModule
} from "@angular/material";
import { AppComponent } from "./components/app-component/app.component";
import { HomeViewComponent } from "./routes-components/home-view/home-view.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { PersonsTableComponent } from "./routes-components/persons-table/persons-table.component";
import { AppRoutingModule } from "./app-routing.module";
import { GlobalSidebarComponent } from "./components/global-sidebar/global-sidebar.component";
import { PersonProvider } from "./services/person-services/person-provider.abstract";
import { UsersTableComponent } from "./routes-components/users-table/users-table.component";
import { UserProvider } from "./services/user-services/user-provider.abstract";
import { EditPersonDialogComponent } from "./routes-components/dialogs/edit-dialog/edit-person-dialog/edit-person-dialog.component";
import { DeletePersonDialogComponent } from "./routes-components/dialogs/delete-dialog/delete-person-dialog/delete-person-dialog.component";
import { AddPersonDialogComponent } from "./routes-components/dialogs/add-dialog/add-person-dialog/add-person-dialog.component";
import { AddUserDialogComponent } from "./routes-components/dialogs/add-dialog/add-user-dialog/add-user-dialog.component";
import { EditUserDialogComponent } from "./routes-components/dialogs/edit-dialog/edit-user-dialog/edit-user-dialog.component";
import { DeleteUserDialogComponent } from "./routes-components/dialogs/delete-dialog/delete-user-dialog/delete-user-dialog.component";
import { UserHttpDataProvider } from "./services/user-services/user-http-data-provider/UserHttpDataProvider";
import { PersonHttpDataProvider } from "./services/person-services/person-http-data-provider/person-http-data-provider.service";
import { GroupProvider } from "./services/group-services/GroupProvider.abstract";
import { GroupHttpDataProvider } from "./services/group-services/group-http-data-provider/GroupHttpDataProvider";
import { ProfessorsTableComponent } from "./routes-components/professors-table/professors-table.component";
import { AddProfessorComponent } from "./routes-components/add-professor/add-professor.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { DeleteProfessorDialogComponent } from "./routes-components/dialogs/delete-dialog/delete-professor-dialog/delete-professor-dialog.component";
import { EditProfessorComponent } from "./routes-components/edit-professor/edit-professor.component";
import { CategoriesTableComponent } from "./routes-components/categories-table/categories-table.component";
import { AddCategoryDialogComponent } from "./routes-components/dialogs/add-dialog/add-category-dialog/add-category-dialog.component";
import { CategoryProvider } from "./services/category-services/data-provider/CategoryProvider.abstract";
import { CategoryHttpDataProvider } from "./services/category-services/data-provider/CategoryHttpDataProvider.service";
import { DeleteCategoryDialogComponent } from "./routes-components/dialogs/delete-dialog/delete-category-dialog/delete-category-dialog.component";
import { EditCategoryDialogComponent } from "./routes-components/dialogs/edit-dialog/edit-category-dialog/edit-category-dialog.component";
import { SettingsComponent } from "./routes-components/settings/settings.component";
import { TreeComponent } from "./routes-components/tree/tree.component";
import { MatTreeModule } from "@angular/material/tree";
import { DeleteDirectoryDialogComponent } from "./routes-components/dialogs/delete-dialog/delete-directory-dialog/delete-directory-dialog.component";
import { LoginComponent } from "./components/login-component/login-component.component";
import { DialogLogin } from "./components/login-component/dialogLogin.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { HttpInterceptor } from "./utils/HttpInterceptor";
import { ErrorDialogComponent } from "./routes-components/dialogs/error-dialog/error-dialog.component";
@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    DialogLogin,
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
    AddUserDialogComponent,
    ProfessorsTableComponent,
    AddProfessorComponent,
    DeleteProfessorDialogComponent,
    EditProfessorComponent,
    CategoriesTableComponent,
    AddCategoryDialogComponent,
    DeleteCategoryDialogComponent,
    EditCategoryDialogComponent,
    SettingsComponent,
    TreeComponent,
    DeleteDirectoryDialogComponent,
    LoginComponent,
    LogoutComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatAutocompleteModule,
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
    MatTabsModule,
    MatCheckboxModule,
    MatTreeModule,
    NgxTinymceModule.forRoot({
      baseURL: "//cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.0/"
    })
  ],
  providers: [
    { provide: PersonProvider, useClass: PersonHttpDataProvider },
    { provide: UserProvider, useClass: UserHttpDataProvider },
    { provide: GroupProvider, useClass: GroupHttpDataProvider },
    { provide: CategoryProvider, useClass: CategoryHttpDataProvider },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditPersonDialogComponent,
    DeletePersonDialogComponent,
    AddPersonDialogComponent,
    EditUserDialogComponent,
    AddUserDialogComponent,
    DeleteUserDialogComponent,
    DeleteProfessorDialogComponent,
    AddCategoryDialogComponent,
    DeleteCategoryDialogComponent,
    EditCategoryDialogComponent,
    DeleteDirectoryDialogComponent,
    DialogLogin,
    ErrorDialogComponent
  ]
})
export class AppModule {}
