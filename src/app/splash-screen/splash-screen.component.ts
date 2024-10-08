import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent implements OnInit {

showSplash: boolean = true;

ngOnInit() {
  
  const splashShow = localStorage.getItem ('splaShow');

  if (splashShow) {
    this.showSplash = false;
  }
  else {
    localStorage.setItem('splashShow','true')
    setTimeout(() =>{
      this.showSplash = false;
    }, 2000)
  }
 }
}
