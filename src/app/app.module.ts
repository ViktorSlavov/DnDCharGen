import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RemoteService } from './services/remoteData.service';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule
  ],
  providers: [RemoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
