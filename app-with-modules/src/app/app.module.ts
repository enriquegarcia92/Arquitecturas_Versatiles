import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CntaskComponent } from './features/cntask/cntask.component';
import { ElistComponent } from './features/elist/elist.component';
import { EtaskComponent } from './features/etask/etask.component';
import { LoginComponent } from './features/login/login.component';
import { NpassComponent } from './features/npass/npass.component';
import { SignupComponent } from './features/signup/signup.component';
import { TaskComponent } from './features/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    CntaskComponent,
    ElistComponent,
    EtaskComponent,
    LoginComponent,
    NpassComponent,
    SignupComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
