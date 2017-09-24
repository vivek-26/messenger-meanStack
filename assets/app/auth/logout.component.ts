import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
   selector: 'app-logout',
   template: `
      <div class="col-md-8 col-md-offset-2">
         <button class="btn btn-danger" (click)="onLogout()">Logout</button>
      </div>
   `
})
export class LogoutComponent {

   constructor(private authService: AuthService, private route: Router) { }

   onLogout() {
      this.authService.logOut()
      this.route.navigate(['/auth', 'signin'])
   }
}