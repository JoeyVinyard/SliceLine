import { Component, OnInit } from '@angular/core';

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

	sort(criteria, direction){
		if(criteria == "distance"){
			if(direction == "up"){
				console.log("Distance Up")
			}
			else if(direction == "down"){
				console.log("Distance Down")
			}
		}
		else if(criteria == "size"){
			if(direction == "up"){
				console.log("Size Up")
			}
			else if(direction == "down"){
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
				console.log("Group Up")
			}
			else if(direction == "down"){
				console.log("Group Down")
			}
		}
		else if(criteria == "cost"){
			if(direction == "up"){
				console.log("Cost Up")
			}
			else if(direction == "down"){
				console.log("Cost Down")
			}
		}
	}

	constructor(private db: DatabaseService){
		navigator.geolocation.getCurrentPosition((pos) => {
			this.lat = pos.coords.latitude;
			this.lng = pos.coords.longitude;
			db.getNearbyStores(pos).then((stores) => {
				console.log(stores);
			}).catch((err) => {
				console.error(err);
			})
		})
	}

	ngOnInit() {
	}

}
