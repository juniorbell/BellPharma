import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private auth: AuthService, private router: Router) {}


  canActivate(): boolean {
    if (this.auth.isAuthenticated$) {
        return true;
    } else {
      this.router.navigate(['/login']);
        return false;
    }
  }  
}
