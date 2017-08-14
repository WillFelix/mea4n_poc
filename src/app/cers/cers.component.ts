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
	orders: any;
	subscriptions: any;
	socket = io('http://localhost:4000');

	constructor(private cersService : CersService) { }

	ngOnInit() {
		this.price = 0.0;
		this.orders = {
			paid: { count: 0, sum: 0 },
			waiting: { count: 0, sum: 0 },
			cancelled: { count: 0, sum: 0 }
		};

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
			this.price = this.toCurrency( res['price'] );
		}, (err) => {
			console.log(err);
		});
	}

	getPaidOrdersAmount() {
		this.cersService.getPaidOrdersAmount().then((res) => {
			this.orders.paid = { count: this.formatNumber(res['count_paid']), sum: this.toCurrency(res['paid']) };
			this.orders.waiting = { count: this.formatNumber(res['count_waiting']), sum: this.toCurrency(res['waiting']) };
			this.orders.cancelled = { count: this.formatNumber(res['count_cancelled']), sum: this.toCurrency(res['cancelled']) };
		}, (err) => {
			console.log(err);
		});
	}

	getTotalSubscriptions() {
		this.cersService.getPaidOrdersAmount().then((res) => {
			this.subscriptions = res['count'];
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
		var result = parseInt(number).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.');
		return result.substr(0, result.length - 3);
	};

}
