import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {JwtInterceptorService} from './shared/service/jwt.interceptor.service';
import {ErrorInterceptor} from './shared/service/error.interceptor.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {appRoutingModule} from './app.routing';
import { ProfileComponent } from './user/profile/profile.component';
import {ToastrModule} from 'ngx-toastr';
import {UtilService} from './shared/service/util.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HistoryComponent } from './user/history/history.component';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    appRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    UtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
