import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { AppComponent } from './components/app-component/app.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PersonsControllerComponent } from './routes/persons-controller/persons-controller.component';
import { ListPersonsComponent } from './routes-components/list-persons/list-persons.component';
import { AddPersonsComponent } from './routes-components/add-persons/add-persons.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    NavbarComponent,
    PersonsControllerComponent,
    ListPersonsComponent,
    AddPersonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
