import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  title: string;
  logo: string;
  menus: Array<object>;

  constructor() {
    this.title = "CERS";
    this.logo = "https://cers.com.br/assets/images/intro/logo.svg";
    this.menus = [
      { title: "Matriculas", link: "cers/matriculations" },
      { title: "Pedidos", link: "cers/orders" }
    ];
  }

}
