import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
   selector: 'app-signup',
   templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {
   dataDrivenForm: FormGroup

   onSubmit() {
      console.log(this.dataDrivenForm)
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