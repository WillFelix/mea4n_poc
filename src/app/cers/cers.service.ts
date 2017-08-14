import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CersService {

	constructor(private http: Http) { }

	getTotalBilling() {
		return new Promise((resolve, reject) => {
			this.http.get('http://127.0.0.1:3000/api/cers/billing')
			.map(res => res.json())
			.subscribe(res => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	}

	getPaidOrdersAmount() {
		return new Promise((resolve, reject) => {
			this.http.get('http://127.0.0.1:3000/api/cers/profit-amount')
			.map(res => res.json())
			.subscribe(res => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	}

}
