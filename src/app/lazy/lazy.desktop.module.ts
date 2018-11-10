import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LazyDesktopComponent } from './lazy.desktop.component';



@NgModule({
  declarations: [LazyDesktopComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: LazyDesktopComponent, pathMatch: 'full'}
    ])
  ]
})
export class LazyDesktopModule {

}
