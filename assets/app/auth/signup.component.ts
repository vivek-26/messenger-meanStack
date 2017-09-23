import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
   selector: 'app-signup',
   templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {
   dataDrivenForm: FormGroup

   // Inject authService
   constructor(private authService: AuthService) { }

   onSubmit() {
      const user = new User(this.dataDrivenForm.value.email,
         this.dataDrivenForm.value.password,
         this.dataDrivenForm.value.firstName,
         this.dataDrivenForm.value.lastName)

      this.authService.signUp(user).subscribe(
         data => console.log(data),
         error => console.log(error)
      )
      this.dataDrivenForm.reset()
   }

   ngOnInit() {
      this.dataDrivenForm = new FormGroup({
         firstName: new FormControl(null /** Indicates that default value is empty*/,
            Validators.required),
         lastName: new FormControl(null, Validators.required),
         email: new FormControl(null, [
            Validators.required,
            Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
         password: new FormControl(null, Validators.required)
      })
   }
}