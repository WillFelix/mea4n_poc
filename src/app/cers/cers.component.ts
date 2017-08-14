import { Component, OnInit } from '@angular/core';
import { CersService } from './cers.service';
import * as io from "socket.io-client";
import * as alertify from "alertifyjs";

@Component({
	selector: 'app-cers',
	templateUrl: './cers.component.html',
	styleUrls: ['../app.component.css', './cers.component.css']
})
export class CersComponent implements OnInit {

	price: any;
	products: any;
	orders: any;
	socket = io('http://localhost:4000');

	constructor(private cersService : CersService) { }

	ngOnInit() {
		this.price = 0.0;
		this.products = 0;

		this.socket.on('new-buy-client', function (data) {
			this.getTotalBilling();
			this.getPaidOrdersAmount();

			alertify.success('Nova compra');
		}.bind(this));

		this.socket.on('new-subscription-client', function (data) {
			this.getTotalSubscriptions();

			alertify.message('Nova matrícula');
		}.bind(this));

		this.getTotalBilling();
		this.getPaidOrdersAmount();
	}

	getTotalBilling() {
		this.cersService.getTotalBilling().then((res) => {
			this.price = res['price'];
		}, (err) => {
			console.log(err);
		});
	}

	getPaidOrdersAmount() {
		this.cersService.getPaidOrdersAmount().then((res) => {
			this.orders = {};
			this.orders.paid = { count: res['count_paid'], sum: res['paid'] };
			this.orders.waiting = { count: res['count_waiting'], sum: res['waiting'] };
			this.orders.cancelled = { count: res['count_cancelled'], sum: res['cancelled'] };
		}, (err) => {
			console.log(err);
		});
	}

	getTotalSubscriptions() {
		this.cersService.getPaidOrdersAmount().then((res) => {
			this.products = res['amount'];
		}, (err) => {
			console.log(err);
		});
	}

	toCurrency(number) {
		return parseFloat(number)
					.toFixed(2)
					.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	};

	formatNumber(number) {
		return parseInt(number)
					.toFixed(0)
					.replace(/(\d)(?=(\d{3})+\.)/g, '$1.');
	};

}
