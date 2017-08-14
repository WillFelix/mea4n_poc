import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CersComponent } from './cers/cers.component';

import { ChatService } from './chat/chat.service';
import { CersService } from './cers/cers.service';

const ROUTES = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: 'app', component: AppComponent },
  { path: 'chats', component: ChatComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    SidebarComponent,
    CersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    ChatService,
    CersService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
