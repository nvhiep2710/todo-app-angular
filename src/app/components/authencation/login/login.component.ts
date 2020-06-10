import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private auth: AuthService,
    private storage: LocalStorageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.auth.loggedIn) {
      this.router.navigate(['/todo']);
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  private showSuccess() {
    this.toastr.success('Login success!', 'Todo Notification!');
  }
  private showError() {
    this.toastr.error(
      'Login error. Please check and try again.!',
      'Todo Notification!'
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.auth.loginUser(this.loginForm.value).subscribe(
      (res) => {
        if (res.status === 200) {
          this.storage.set('token', res.data.access_token);
          this.storage.setObject('user', res.data.user);
          this.showSuccess();
          this.router.navigateByUrl('/todo');
        } else {
          this.showError();
        }
      },
      (err) => {}
    );
  }
}
