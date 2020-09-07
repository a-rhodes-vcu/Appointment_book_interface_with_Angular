// This app.module is loading some other things from the library from this Angular folder in node modules. 
// Angular loads as little of the library as possible and load only the things you need to build your application.
// Now this file is also loading up our first component, and so it's going to look for a file called app.component

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from  './app.component';
import { AddComponent } from './components/add/add.component';
import { SearchComponent } from './components/search/search.component';
import { ListComponent } from './components/list/list.component';

// So this decorator adds information to the default module that we load from the Angular core library and in here we're declaring that we are using this App component 
@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    SearchComponent,
    ListComponent
  ],
  // if this module that we're creating needs something from another library then we need to import it.
  imports: [
    BrowserModule, HttpClientModule, FormsModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
