import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {DatabaseService} from '../services/database.service'

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


	username = "";
	password = "";
	confirm = "";
	error = "";

	signup(){
		this.db.signup(this.username, this.password, this.confirm).then((s) => {
			if(s.hash){
				document.cookie="token="+s.hash;
				localStorage.setItem('username', this.username);
				this.r.navigateByUrl('/pizza');
			}else{
				this.error = "Problem with signup";
			}
		})
	}

	constructor(private db: DatabaseService, private r: Router) {
		particlesJS.load('particles-js', 'assets/particles.json', function() {
			console.log('callback - particles.js config loaded');
		});
	}

	ngOnInit() {}
}
