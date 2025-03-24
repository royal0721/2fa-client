import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  qrCode = '';
  email = 'test@example.com';
  token = '';
  verifyResult: boolean | null = null;

  constructor(private http: HttpClient) {}

  generateQRCode() {
    this.http
      .post<any>('/api/2fa/setup', { email: this.email })
      .subscribe((res) => {
        this.qrCode = res.qrCode;
      });
  }

  verifyToken() {
    this.http
      .post<any>('/api/2fa/verify', {
        email: this.email,
        token: this.token,
      })
      .subscribe({
        next: (res) => (this.verifyResult = res.success),
        error: (err) => (this.verifyResult = false),
      });
  }
}
