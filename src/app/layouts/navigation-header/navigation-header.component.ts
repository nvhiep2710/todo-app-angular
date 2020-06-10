import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css'],
})
export class NavigationHeaderComponent implements OnInit {
  isLogged;
  isUserInfo = null;

  constructor(
    private authService: AuthService,
    private storage: LocalStorageService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.authService.loggedIn();
    this.isUserInfo = JSON.parse(this.authService.getUserInfo());
  }

  private showSuccess() {
    this.toastr.success('Logout success!', 'Todo Notification!');
  }

  async logout() {
    if (!this.isLogged) {
      return;
    }

    await this.storage.clearStorageKey('token');
    await this.storage.clearStorageKey('user');
    this.showSuccess();
    await this.router.navigateByUrl('/login');
  }
}
