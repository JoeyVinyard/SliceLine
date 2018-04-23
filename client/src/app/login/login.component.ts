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
    this.db.login(this.username, this.password);
  }

  ngOnInit() {
  }

}
