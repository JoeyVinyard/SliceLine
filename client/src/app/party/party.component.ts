import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ng-socket-io';
import { DatabaseService } from '../services/database.service';

@Component({
	selector: 'app-party',
	templateUrl: './party.component.html',
	styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {

	user = "";
	party;
	message;
	messages = [];
	partySize = 1;

	sendMessage(){
		this.s.emit('message', {
			message: this.message,
			sender: this.user,
			party: this.party.id
		});
		this.message = "";
	}

	getMessage() {
		return this.s.fromEvent("message").subscribe((data) => {
			this.messages.push(data);
			console.log(this.messages);
		})
	}
	getJoinees() {
		return this.s.fromEvent("partyJoin").subscribe((data: number) => {
			this.partySize = data;
		})
	}
	getLeave() {
		return this.s.fromEvent("partyLeave").subscribe((data: number) => {
			this.partySize = data;
		})
	}

	constructor(private r: Router, private s: Socket, private db: DatabaseService) {
		this.party = JSON.parse(localStorage.getItem("currentParty"));
		this.user = localStorage.getItem("username");
		if(!this.party){
			r.navigateByUrl('pizza');
		}
		s.emit('joinParty', this.party.id);
		this.getMessage();
		this.getJoinees();
		this.getLeave();
	}

	leaveParty(){
		this.db.leaveParty(localStorage.getItem('username'), this.party.id);
		this.s.emit('leaveParty', this.party.id);
		this.r.navigateByUrl('/pizza');
	}

	ngOnInit() {}

}
