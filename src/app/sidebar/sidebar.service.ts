import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  title: string;
  logo: string;
  menus: Array<object>;

  constructor() { }

}
