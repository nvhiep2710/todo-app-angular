import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private auth: AuthService,
    private storage: LocalStorageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.auth.loggedIn()) {
      this.router.navigate(['/todo']);
    }
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }
  get f() {
    return this.registerForm.controls;
  }
  private showSuccess() {
    this.toastr.success('Register success!', 'Todo Notification!');
  }
  private showError() {
    this.toastr.error('Email already exist!', 'Todo Notification!');
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    delete this.registerForm.value['confirmPassword'];
    this.auth.registerUser(this.registerForm.value).subscribe(
      (res) => {
        if (res.status === 200) {
          this.storage.set('token', res.data.access_token);
          this.showSuccess();
          this.router.navigateByUrl('/login');
        } else {
          this.showError();
        }
      },
      (err) => {}
    );
  }
}
