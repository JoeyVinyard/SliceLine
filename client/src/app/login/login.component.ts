import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../services/database.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";
  constructor(private db: DatabaseService) {
	particlesJS.load('particles-js', 'assets/particles.json', function() {
		console.log('callback - particles.js config loaded');
	});
  }

  login(){
    this.db.login(this.username, this.password);
  }

  ngOnInit() {
  }

}
