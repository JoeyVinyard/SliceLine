import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OrderComponent } from './order/order.component';
import { PizzaComponent } from './pizza/pizza.component';
import { PartyComponent } from './party/party.component';
import { SplashComponent } from './splash/splash.component';

import { AuthguardService } from './authguard.service';

export const ROUTES: Routes = [
	{
		path: "",
		component: SplashComponent
	},
	{
		path: "login",
		component: LoginComponent
	},
	{
		path: "order",
		component: OrderComponent,
		canActivate: [AuthguardService]
	},
	{
		path: "party",
		component: PartyComponent,
		canActivate: [AuthguardService]
	},
	{
		path: "pizza",
		component: PizzaComponent,
		canActivate: [AuthguardService]
	},
	{
		path: "signup",
		component: SignupComponent
	}
];