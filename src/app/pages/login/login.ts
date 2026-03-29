import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthStore } from '../../stores/auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class Login {
  private authStore = inject(AuthStore);
  private router = inject(Router);

  username = '';
  password = '';
  error = '';

  login() {
    if (!this.username || !this.password) {
      this.error = 'Please enter your credentials';
      return;
    }
    this.authStore.setCredentials(this.username, this.password);
    this.router.navigate(['/']);
  }
}
