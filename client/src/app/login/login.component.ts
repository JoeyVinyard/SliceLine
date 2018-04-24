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
				this.error = "Username or password incorrect";
			}
		})
	}
	constructor(private db: DatabaseService, private r: Router) {
		particlesJS.load('particles-js', 'assets/particles.json', function() {
			console.log('callback - particles.js config loaded');
		});
	}

	ngOnInit() {
	}

}
