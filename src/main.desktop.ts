import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppDesktopModule } from './app/app.desktop.module';


document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppDesktopModule);
});
