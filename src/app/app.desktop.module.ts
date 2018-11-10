import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppDesktopComponent } from './app.desktop.component';
import { HomeDesktopComponent } from './home/home.desktop.component';


@NgModule({
  declarations: [
    AppDesktopComponent,
    HomeDesktopComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
      { path: '', component: HomeDesktopComponent, pathMatch: 'full'},
      { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
      { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
    ]),
  ],
  providers: [],
  bootstrap: [AppDesktopComponent]
})
export class AppDesktopModule { }
