import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-cers',
  templateUrl: './cers.component.html',
  styleUrls: ['../app.component.css']
})
export class CersComponent implements OnInit {

  title: string;
  logo: string;

  constructor(private sidebar: SidebarService) { }

  ngOnInit() {
    this.sidebar.title = "CERS";
    this.sidebar.logo = "https://cers.com.br/assets/images/intro/logo.svg";
    this.sidebar.menus = [
      { title: "Matriculas", link: "cers/matriculations" },
      { title: "Pedidos", link: "cers/orders" }
    ];
  }

  toggleNotifications() {

  }

}
