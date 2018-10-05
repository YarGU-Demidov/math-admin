import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { NavbarComponent } from './navbar/navbar.component';
const appRoutes: Routes =[
  { path: '', component: HomeViewComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
