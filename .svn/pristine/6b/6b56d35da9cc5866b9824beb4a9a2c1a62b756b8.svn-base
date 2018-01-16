import { NgModule, Component, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FrameworkModule } from './framework.module';

import { IndexModule } from '../index.module';
import { AppComponent } from './app';
import { appRouter } from './app.route';
import { Login } from '@app/login/login';

import { CacheInterceptor } from '@framework/Service/cache.service';
import { DataIntercepter } from '@framework/Service/Data.service';


@NgModule({
  declarations: [
    AppComponent,
    Login,
  ],
  imports: [
    RouterModule.forRoot(appRouter),

    FrameworkModule,

    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IndexModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DataIntercepter,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
