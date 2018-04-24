import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {DatabaseService} from '../services/database.service'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	username = "";
	password = "";
	error = "";

	login(){
		this.db.login(this.username, this.password).then((data) => {
			if(data.hash){
				document.cookie="token="+data.hash;
				localStorage.setItem('username', this.username);
				this.r.navigateByUrl('/pizza');
			}else{
				console.log('aaaa')
				this.error = "Username or password incorrect";
			}
		})
	}
	constructor(private db: DatabaseService, private r: Router) { }

	ngOnInit() {
	}

}
