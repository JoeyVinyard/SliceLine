import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OrderComponent } from './order/order.component';
import { PizzaComponent } from './pizza/pizza.component';
import { SplashComponent } from './splash/splash.component';
import {DatabaseService } from './services/database.service';
import { ROUTES } from './app.routes';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		SignupComponent,
		OrderComponent,
		PizzaComponent,
		SplashComponent
	],
	imports: [
		BrowserModule,
		RouterModule,
		RouterModule.forRoot(ROUTES),
		FormsModule,
		HttpModule,
		HttpClientModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyAYPFjyBz7atRsbr5GyJtlRiBLpu6hcD0A'
		})
	],
	providers: [DatabaseService],
	bootstrap: [AppComponent]
})
export class AppModule { }
