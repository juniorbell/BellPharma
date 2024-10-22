import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const user = this.authService.login(this.username, this.password);
    if (user) {
      localStorage.setItem('userRole', user.role);
      this.router.navigate(['/list-medicamentos']);
    } else {
      this.errorMessage = 'Credenciais inválidas';
    }
  }

}
