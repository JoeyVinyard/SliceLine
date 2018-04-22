import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OrderComponent } from './order/order.component';
import { PizzaComponent } from './pizza/pizza.component';
import { SplashComponent } from './splash/splash.component';

import { ROUTES } from './app.routes';


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
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyAYPFjyBz7atRsbr5GyJtlRiBLpu6hcD0A'
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
