import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable()
export class AuthguardService implements CanActivate{
	canActivate() {
		console.log(document.cookie);
		console.log("Authed,", document.cookie.includes('token='));
		if(document.cookie.includes('token=') || !environment.production)
			return true;
		this.r.navigateByUrl('');
		return false;
	}
	constructor(private r: Router) { }

}
