import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client";
import * as alertify from "alertifyjs";

@Component({
	selector: 'app-logs',
	templateUrl: './logs.component.html',
	styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
	socket = io('http://localhost:4000');

	constructor() { }

	ngOnInit() {
		this.socket.on('exception', function (data) {
			console.log(data);
			console.info(JSON.stringify(data));
			
			alertify.error('++ Erro');
		}.bind(this));
	}

}
