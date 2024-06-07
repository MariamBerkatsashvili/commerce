import { Component, OnInit } from '@angular/core';
import { SignComponent } from '../sign/sign.component';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private loginsvc:LoginService){}

  username!: any

 ngOnInit() {
  this.loginsvc.user$.subscribe(user => this.username = user);
  // console.log(this.username.firstName)
}

logout(): void {
  this.loginsvc.logout();
}
// console.log(this.username)
}
