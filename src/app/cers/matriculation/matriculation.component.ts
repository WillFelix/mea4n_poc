import { Chart } from 'angular-highcharts';
import { Component, OnInit } from '@angular/core';
import { CersService } from '../cers.service';
import * as alertify from "alertifyjs";

@Component({
  selector: 'cers-matriculation',
  templateUrl: './matriculation.component.html',
  styleUrls: ['../../app.component.css', './matriculation.component.css']
})
export class MatriculationComponent implements OnInit {

  loading: boolean;
  courses: any;
  count_actives_matriculations: string;

  constructor(private cersService : CersService) { }

  ngOnInit() {
    this.loading = true;
    this.count_actives_matriculations = '0';

    this.getActivesMatriculations();
    this.getMatriculationsOfTheMostSoldCourses();
  }

  getActivesMatriculations() {
    this.cersService.getActivesMatriculations().then((res) => {
      this.count_actives_matriculations = this.formatNumber(res['count']);
    }, (err) => {
      console.log(err);
    });
  }

  getMatriculationsOfTheMostSoldCourses() {
    this.cersService.getMatriculationsOfTheMostSoldCourses().then((res) => {
      this.courses = res['courses'];
      this.loading = false;
    }, (err) => {
      console.log(err);
    });
  }

  formatNumber(number) {
		var result = parseInt(number).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.');
		return result.substr(0, result.length - 3);
	};

}
