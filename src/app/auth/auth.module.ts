import {NgModule} from '@angular/core';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  imports: [
    AuthModule.forRoot({
      domain: 'dev-m1u3ec0lxneslh1m.us.auth0.com',
      clientId: 'g8KCs3Z5yytXVIvO6SurYiNaASl4bvkn',
    }),
  ],
})
export class AppModule {}
