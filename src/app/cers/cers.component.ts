import { Component, OnInit } from '@angular/core';
import { CersService } from '../cers/cers.service';

@Component({
	selector: 'app-cers',
	templateUrl: './cers.component.html',
	styleUrls: ['../app.component.css', './cers.component.css']
})
export class CersComponent implements OnInit {

	title: string;
	logo: string;
	bool: boolean;

	constructor(private service: CersService) { }

	ngOnInit() {}

	toggleNotifications() {
		this.bool = this.service.isNotify;
		this.service.isNotify = !this.bool;
	}

}
