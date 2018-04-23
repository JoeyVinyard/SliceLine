import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../services/database.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private db: DatabaseService) {
  }

  username = "";
  password = "";
  confirm = "";
  ngOnInit() {
  }

  signup(){
    this.db.signup(this.username, this.password, this.confirm);
  }

}
