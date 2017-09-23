import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './user.model';
import { AuthService } from './auth.service';

@Component({
   selector: 'app-signin',
   templateUrl: './signin.component.html'
})
export class SigninComponent {
   dataDrivenForm: FormGroup

   constructor(private authService: AuthService, private router: Router) { }

   onSubmit() {
      const user = new User(this.dataDrivenForm.value.email, this.dataDrivenForm.value.password)
      this.authService.signIn(user)
         .subscribe(
         data => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.userId)
            this.router.navigateByUrl('/')
         },
         error => console.log(error)
         )
      this.dataDrivenForm.reset()
   }

   ngOnInit() {
      this.dataDrivenForm = new FormGroup({
         email: new FormControl(null, [
            Validators.required,
            Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
         password: new FormControl(null, Validators.required)
      })
   }
}