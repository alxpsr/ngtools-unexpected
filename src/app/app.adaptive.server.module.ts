import {NgModule} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

import {AppAdaptiveModule} from './app.adaptive.module';
import { AppAdaptiveComponent } from './app.adaptive.component';

@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppAdaptiveModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppAdaptiveComponent],
})
export class AppAdaptiveServerModule {}
