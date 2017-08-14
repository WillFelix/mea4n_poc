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
	socket = io('http://localhost:4000');

	constructor(private cersService : CersService) { }

	ngOnInit() {
		this.price = 0.0;
		this.products = 0;

		this.socket.on('new-buy-client', function (data) {
			this.price = parseFloat(this.price);
			this.price += parseFloat(data.price) || 0;

			this.products += parseInt(data.products) || 0;

			alertify.success('Nova compra');
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
			this.products = res['amount'];
		}, (err) => {
			console.log(err);
		});
	}

}
