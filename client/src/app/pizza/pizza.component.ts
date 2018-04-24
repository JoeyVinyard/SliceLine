import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DatabaseService } from '../services/database.service';

@Component({
	selector: 'app-pizza',
	templateUrl: './pizza.component.html',
	styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {

	lat: number;
	lng: number;

	testArray=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	parties = [];

	userPin = ("../../assets/UserPin.png");
	partyPin = ("../../assets/PartyPin.png");
	
	sort(criteria, direction){
		if(criteria == "distance"){
			if(direction == "up"){
				this.parties.sort( function(a,b) {
					return a.dist - b.dist;
				});
				console.log("Distance Up")
			}
			else if(direction == "down"){
				console.log("Distance Down")
				this.parties.sort( function(a,b) {
					return b.dist - a.dist;
				});
			}
		}
		else if(criteria == "size"){
			if(direction == "up"){
				this.parties.sort( function(a , b) {
					return a.order.length - b.order.length;
				})
				console.log("Size Up")
			}
			else if(direction == "down"){
				this.parties.sort( function(a , b) {
					return b.order.length - a.order.length;
				})
				console.log("Size Down")
			}
		}
		else if(criteria == "pizza"){
			if(direction == "up"){
				console.log("Pizza Up")
			}
			else if(direction == "down"){
				console.log("Pizza Down")
			}
		}
		else if(criteria == "group"){
			if(direction == "up"){
				this.parties.sort( function(a , b) {
					return a.size - b.size;
				})
				console.log("Group Up")
			}
			else if(direction == "down"){
				this.parties.sort( function(a , b) {
					return b.size - a.size;
				})
				console.log("Group Down")
			}
		}
		else if(criteria == "cost"){
			if(direction == "up"){
				this.parties.sort( function(a , b) {
					return a.total - b.total;
				})
			}
			else if(direction == "down"){
				this.parties.sort( function(a , b) {
					return b.total - a.total;
				})
				console.log("Cost Down")
			}
		}
	}

	logout(){
		document.cookie="token=0; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
		this.r.navigateByUrl('');
	}

	constructor(private db: DatabaseService, private r: Router){
		navigator.geolocation.getCurrentPosition((pos) => {
			this.lat = pos.coords.latitude;
			this.lng = pos.coords.longitude;
			db.getNearbyStores(pos).then((stores) => {
				console.log(stores);
			}).catch((err) => {
				console.error(err);
			})
			db.storeLocation(localStorage.getItem('username'), pos).then(() => {
				console.log("location stored");
			});
		})

		this.db.getParties(localStorage.getItem('username')).then((data) => {
			this.parties = data;
			console.log(data);
		});
	}

	ngOnInit() {
	}

}
