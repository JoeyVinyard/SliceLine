import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OrderComponent } from './order/order.component';
import { PizzaComponent } from './pizza/pizza.component';
import { SplashComponent } from './splash/splash.component';
import { DatabaseService } from './services/database.service';
import { AuthguardService } from './authguard.service';
import { PartyComponent } from './party/party.component';

import { ROUTES } from './app.routes';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		SignupComponent,
		OrderComponent,
		PizzaComponent,
		SplashComponent,
		PartyComponent
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
		}),
		SocketIoModule.forRoot(config)
	],
	providers: [
		DatabaseService,
		AuthguardService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
