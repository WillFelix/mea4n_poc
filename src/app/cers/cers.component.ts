import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client";

@Component({
	selector: 'app-cers',
	templateUrl: './cers.component.html',
	styleUrls: ['../app.component.css', './cers.component.css']
})
export class CersComponent implements OnInit {

	price = 0.0;
	socket = io('http://localhost:4000');

	constructor() { }

	ngOnInit() {
		this.socket.on('new-buy-client', function (data) {

			this.price = data.price;

		}.bind(this));
	}

}
