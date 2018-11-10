import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppAdaptiveModule } from './app/app.adaptive.module';

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppAdaptiveModule);
});
