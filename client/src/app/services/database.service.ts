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
		return new Promise((resolve, reject) => {
			var loginObject = {
				username: username,
				password: pass
			};
			console.log("sending");
			this.http.post(this.dbUrl + "login", JSON.stringify(loginObject), this.httpOptions).subscribe((data) => {
				resolve(data);
			});
		});
	}

	signup(username: String, pass: String, confirm: String): Promise<any> {
		return new Promise((resolve, reject) => {
			var loginObject = {
				username: username,
				password: pass,
				confpass: confirm
			};
			this.http.post(this.dbUrl + "signup", JSON.stringify(loginObject), this.httpOptions).subscribe((data) => {
				resolve(data);
			});
		});
	}
	storeLocation(username, pos: Position): Promise<any>{
		return new Promise((resolve, reject) => {
			var locationObject = {
				username: username,
				lat: pos.coords.latitude.toString(),
				lon: pos.coords.longitude.toString()
			}
			console.log(locationObject);
			this.http.post(this.dbUrl+ "storeLocation", JSON.stringify(locationObject), this.httpOptions).subscribe((data) => {
				resolve(data);				
			});
		});
	}

	getLocation(username: String): Promise<any>{
		console.log("Getting location")
		return new Promise((resolve, reject) => {
			this.http.get(this.dbUrl+ "getLocation/"+username, this.httpOptions).subscribe((data) => {
				resolve(data);
				return;
			});
		})
	}

	createParty(username: String, party: any): Promise<any> {
		console.log(party)
		return new Promise((resolve, reject) => {
			var partyobj = {
				creator: username,
				party: party
			}
			console.log(partyobj);
			this.http.post(this.dbUrl+ "createParty/", JSON.stringify(partyobj), this.httpOptions).subscribe((data) => {
				console.log(data);
				resolve(data);
			});
		})
	}

	getParties(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.get(this.dbUrl+ "getParties/", this.httpOptions).subscribe((data) => {
				resolve(data);
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

	getStoreMenu(id: number): Promise<any>{
		var options = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
			}),
			params: new HttpParams()
				.set("id", id.toString())
		}
		return new Promise((resolve, reject) => {
			this.http.get(this.dbUrl+ "getStoreMenu", options).subscribe((data) => {
				if(data)
					resolve(data);
				else
					reject(data["err"]);
			});
		})
	}
	constructor(private http: HttpClient) {}

}
