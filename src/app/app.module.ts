import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ChartModule } from 'angular-highcharts';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

import { AppComponent } from './app.component';
import { CersComponent } from './cers/cers.component';
import { OrderComponent } from './cers/order/order.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatriculationComponent } from './cers/matriculation/matriculation.component';
import { LogsComponent } from './cers/logs/logs.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { CersService } from './cers/cers.service';
import { SidebarService } from './sidebar/sidebar.service';

const appRoutes: Routes = [
  { path: 'cers', component: CersComponent },
  { path: 'cers/orders', component: OrderComponent },
  { path: 'cers/matriculations', component: MatriculationComponent },
  { path: 'cers/logs', component: LogsComponent },
  { path: '', redirectTo: 'cers', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CersComponent,
    OrderComponent,
    MatriculationComponent,
    LogsComponent,
    PageNotFoundComponent
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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    CersService,
    SidebarService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
