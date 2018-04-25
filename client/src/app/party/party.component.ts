import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ng-socket-io';

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

	constructor(private r: Router, private s: Socket) {
		this.party = JSON.parse(localStorage.getItem("currentParty"));
		this.user = localStorage.getItem("username");
		if(!this.party){
			r.navigateByUrl('pizza');
		}
		s.emit('joinParty', this.party.id);		
		this.getMessage();
	}

	ngOnInit() {}

}
