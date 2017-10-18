import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CersService {

	isNotify: boolean;

	constructor(private http: Http) {
		this.isNotify = false;
	}

	/**
	* ORDERS
	*/
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

	getProfit() {
		return new Promise((resolve, reject) => {
			this.http.get('http://127.0.0.1:3000/api/cers/profit')
			.map(res => res.json())
			.subscribe(res => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	}

	getProfitPerMonth() {
		return new Promise((resolve, reject) => {
			this.http.get('http://127.0.0.1:3000/api/cers/profit-per-month')
			.map(res => res.json())
			.subscribe(res => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	}

	/**
	* MATRICULATIONS
	*/

	getActivesMatriculations() {
		return new Promise((resolve, reject) => {
			this.http.get('http://127.0.0.1:3000/api/cers/actives-matriculations')
			.map(res => res.json())
			.subscribe(res => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	}

	getMatriculationsOfTheMostSoldCourses() {
		return new Promise((resolve, reject) => {
			this.http.get('http://127.0.0.1:3000/api/cers/most-solds')
			.map(res => res.json())
			.subscribe(res => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	}
}
