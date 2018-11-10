import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LazyAdaptiveComponent } from './lazy.adaptive.component';



@NgModule({
  declarations: [LazyAdaptiveComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: LazyAdaptiveComponent, pathMatch: 'full'}
    ])
  ]
})
export class LazyAdaptiveModule {

}
