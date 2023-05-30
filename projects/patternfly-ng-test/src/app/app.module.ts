import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatternflyModule } from './patternfly/patternfly.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PatternflyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
