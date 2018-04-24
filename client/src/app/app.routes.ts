import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OrderComponent } from './order/order.component';
import { PizzaComponent } from './pizza/pizza.component';
import { SplashComponent } from './splash/splash.component';

import { AuthguardService } from './authguard.service';

export const ROUTES: Routes = [
	{
		path: "",
		component: SplashComponent
	},
	{
		path: "login",
		component: LoginComponent,
		canActivate: [AuthguardService]
	},
	{
		path: "order",
		component: OrderComponent
	},
	{
		path: "pizza",
		component: PizzaComponent
	},
		{
		path: "signup",
		component: SignupComponent
	}
];