import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { HttpClientModule } from '@angular/common/http';
import { ArticlesService } from './data/articles.service';

import { MatTableModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookComponent } from './book/book.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    DashboardComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    ArticlesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
