import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class DatabaseService {

	dbUrl = environment.serverUrl;

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type':  'application/json',
		})
	};

	//Create user profile in firebase based on the User object. Returns a promise to the snapshot of the data posted, or an error message
	login(username: String, pass: String): Promise<any> {
		console.log("Wooo");
		return new Promise((resolve, reject) => {
			var loginObject = {
				username: username,
				password: pass
			};
			console.log("sending");
			this.http.post(this.dbUrl + "login", JSON.stringify(loginObject), this.httpOptions).subscribe((data) => {
				console.log(data);
			});
			//this.http.post()
		});
	}

	signup(username: String, pass: String, confirm: String): Promise<any> {
		console.log("Wooo");
		return new Promise((resolve, reject) => {
			var loginObject = {
				username: username,
				password: pass,
				confpass: confirm
			};
			console.log("sending");
			this.http.post(this.dbUrl + "signup", JSON.stringify(loginObject), this.httpOptions).subscribe((data) => {
				console.log(data);
			});
			//this.http.post()
		});
	}


	
	storeLocation(loc, username): Promise<any>{
		return new Promise((resolve, reject) => {
			var locationObject = {
				lat: 0,
				lon: 0,
				uid: ""
			}
			if(!!loc.latitude && !!loc.longitude){
				locationObject.lat = loc.latitude;
				locationObject.lon = loc.longitude;
				locationObject.uid = username;
			}else{
				reject("Invalid location object");
			}
							
			this.http.post(this.dbUrl+ "storeLocation", JSON.stringify(locationObject), this.httpOptions).subscribe((data) => {
				if(data["payload"])
					resolve(data["payload"]);
				else
					reject(data["err"]);
			});
		});
	}

	getLocation(username: String): Promise<any>{
		console.log("Getting location")
		return new Promise((resolve, reject) => {
			this.http.get(this.dbUrl+ "getLocation/"+username, this.httpOptions).subscribe((data) => {
				if(data["payload"])
					resolve(data["payload"]);
				else
					reject(data["err"]);
			});
		})
	}

	getNearbyStores(pos: Position): Promise<any>{
		var options = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
			}),
			params: new HttpParams()
				.set("lat", pos.coords.latitude.toString())
				.set("lon", pos.coords.longitude.toString())
		}
		return new Promise((resolve, reject) => {
			this.http.get(this.dbUrl+ "getNearbyStores", options).subscribe((data) => {
				if(data)
					resolve(data);
				else
					reject(data["err"]);
			});
		})
	}
	constructor(private http: HttpClient) {}

}
