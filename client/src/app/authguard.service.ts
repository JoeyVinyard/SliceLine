import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable()
export class AuthguardService implements CanActivate{
	canActivate() {
		console.log("Authed,", document.cookie.split(';').indexOf('token=') != -1);
		return document.cookie.split(';').indexOf('token=') != -1;
	}
	constructor() { }

}
