import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../shared/service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  isLoggedIn() {
    return !!this.authService.currentUserValue;
  }

  logout() {
    this.authService.logout();
  }

}
