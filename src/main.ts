import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Import HttpClient

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // Preserve existing providers from appConfig
    provideHttpClient(withFetch()), // Add HttpClient with fetch API support
  ],
}).catch((err) => console.error(err));
