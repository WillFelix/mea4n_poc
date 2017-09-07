import { Chart } from 'angular-highcharts';
import { Component, OnInit } from '@angular/core';
import { CersService } from '../cers.service';
import { SidebarService } from '../../sidebar/sidebar.service';
import * as io from "socket.io-client";
import * as alertify from "alertifyjs";

@Component({
	selector: 'cers-order',
	templateUrl: './order.component.html',
	styleUrls: ['../../app.component.css', './order.component.css']
})
export class OrderComponent implements OnInit {

	firstMonth: number;
	lastMonth: number;
	loading: boolean;
	chart: any;
	isNotify: boolean;
	months: any;
	price: any;
	currentYear: number;
	orders: any;
	socket = io('http://localhost:4000');

	constructor(private cersService : CersService, private sidebarService : SidebarService) { }

	ngOnInit() {
		this.loading = true;
		this.currentYear = (new Date().getFullYear());
		this.firstMonth = 12;
		this.lastMonth = 0;
		this.months = [];
		this.price = 0.0;
		this.orders = {
			paid: { count: 0, sum: 0 },
			waiting: { count: 0, sum: 0 },
			cancelled: { count: 0, sum: 0 }
		};

		this.socket.on('new-buy-client', function (data) {
			this.getTotalBilling();
			this.getProfit();
			this.getProfitPerMonth();

			if (this.sidebarService.isNotify) {
				alertify.success('Nova compra');
			}
		}.bind(this));

		this.getTotalBilling();
		this.getProfit();
		this.getProfitPerMonth();
	}

	getTotalBilling() {
		this.cersService.getTotalBilling().then((res) => {
			this.price = this.toCurrency( res['price'] );
		}, (err) => {
			console.log(err);
		});
	}

	getProfit() {
		this.cersService.getProfit().then((res) => {
			this.orders = {
				paid: { count: this.formatNumber( res['count_paid'] ), sum: this.toCurrency( res['paid'] ) },
				waiting: { count: this.formatNumber( res['count_waiting'] ), sum: this.toCurrency( res['waiting'] ) },
				cancelled: { count: this.formatNumber( res['count_cancelled'] ), sum: this.toCurrency( res['cancelled'] ) }
			};
		}, (err) => {
			console.log(err);
		});
	}

	getProfitPerMonth() {
		this.cersService.getProfitPerMonth().then((res) => {
			let arr = [];
			arr = arr.concat(res);

			arr.forEach((v, k) => {
				var month = parseInt( v['month'] );
				if ( month > this.lastMonth ){
					this.lastMonth = month;
				}

				if (month < this.firstMonth) {
					this.firstMonth = month;
				}

				this.months[ v['month'] ] = {
					total: { count: this.formatNumber(v['count_total']), sum: this.toCurrency(v['total']) },
					paid: { count: this.formatNumber(v['count_paid']), sum: this.toCurrency(v['paid']) },
					waiting: { count: this.formatNumber(v['count_waiting']), sum: this.toCurrency(v['waiting']) },
					cancelled: { count: this.formatNumber(v['count_cancelled']), sum: this.toCurrency(v['cancelled']) },
				};
			});

			this.initChart();
			this.loading = false;
		}, (err) => {
			console.log(err);
		});
	}

	initChart() {
		let paid = [];
		let waiting = [];
		let cancelled = [];

		for (let i = this.firstMonth; i <= this.lastMonth; i++) {
			paid[i] = 0;
			waiting[i] = 0;
			cancelled[i] = 0;

			var m = this.months[i];
			if (m) {
				paid[i] = parseInt(m.paid.count.replace(/\./, "").replace(/,/, "."));
				waiting[i] = parseInt(m.waiting.count.replace(/\./, "").replace(/,/, "."));
				cancelled[i] = parseInt(m.cancelled.count.replace(/\./, "").replace(/,/, "."));
			}
		}

		this.chart = new Chart({
			title: {
				text: 'Pedidos por mês'
			},
			xAxis: {
				categories: ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
			},
			colors: ['#90ed7d', '#434348', '#ec7c7c'],
			series: [{
				type: 'column',
				name: 'Aprovados',
				data: paid
			}, {
				type: 'column',
				name: 'Aguardando',
				data: waiting
			}, {
				type: 'column',
				name: 'Cancelados',
				data: cancelled
			}]
		});
	}

	toggleNotifications() {
		this.isNotify = !this.isNotify;
	};

	toCurrency(number) {
		return parseFloat(number)
				.toFixed(2)
				.replace(/\./, ',')
				.replace(/(\d)(?=(\d{3})+\,)/g, '$1.');
	};

	formatNumber(number) {
		var result = parseInt(number).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.');
		return result.substr(0, result.length - 3);
	};

}
