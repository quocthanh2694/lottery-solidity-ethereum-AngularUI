import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Web3Service } from './services/web3-service';
import { FactoryService } from './services/factory.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [Web3Service, FactoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
