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
  constructor(private db: DatabaseService) { }

  login(){
    console.log("does this happen");
  
    this.db.login(this.username, this.password).then((data) => {
      console.log(data);
      if(true/*I"ll confirm login was succesful here tomorros*/){
          localStorage.setItem('username', this.username);
          console.log(localStorage.getItem('username'));
      }
    });
  }

  ngOnInit() {
  }

}
