import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../app.component.css', './sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private service : SidebarService) { }

  ngOnInit() {
    
  }

  toggleNotifications() {

  }

  title() {
    return this.service.title;
  }

  logo() {
    return this.service.logo;
  }

  menus() {
    return this.service.menus;
  }

}
