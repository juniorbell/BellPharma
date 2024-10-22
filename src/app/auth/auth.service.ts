import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users =[
    {username: 'Admin', password: '54321', role: 'admin'},
    {username: 'usuario', password: '12345', role: 'admin'},
  ]
  constructor() { }

  login(username: string, password: string): { role: string } | null {
    const user = this.users.find(u => u.username === username && u.password === password);
    return user ? { role: user.role } : null;
  }
}
