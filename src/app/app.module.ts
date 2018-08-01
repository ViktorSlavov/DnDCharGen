import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RemoteService } from './services/remoteData.service';
import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { ClassModule } from './component/class/class.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MainModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule
  ],
  providers: [RemoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
