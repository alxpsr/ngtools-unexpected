import {NgModule} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

import {AppDesktopModule} from './app.desktop.module';
import {AppDesktopComponent} from './app.desktop.component';

@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppDesktopModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppDesktopComponent],
})
export class AppDesktopServerModule {}
