import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ChartModule } from 'angular-highcharts';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CersComponent } from './cers/cers.component';
import { OrderComponent } from './cers/order/order.component';

import { CersService } from './cers/cers.service';


const ROUTES = [
  //{ path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: '', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    OrderComponent,
    CersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.wanderingCubes,
      backdropBackgroundColour: 'rgba(255, 255, 255, 1)',
      backdropBorderRadius: '4px',
      primaryColour: '#0000ff',
      secondaryColour: '#ff0000',
      tertiaryColour: '#00ff00'
    }),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    CersService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
