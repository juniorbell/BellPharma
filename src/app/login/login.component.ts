import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  template: `
      <button (click)="login()">Logi</login>
  `,
})
export class LoginComponent {

  constructor (private auth: AuthService) {}



  login() {
    this.auth.loginWithRedirect();
  }

}
