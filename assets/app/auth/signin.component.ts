import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
   selector: 'app-signin',
   templateUrl: './signin.component.html'
})

export class SigninComponent {
   dataDrivenForm: FormGroup

   onSubmit() {
      console.log(this.dataDrivenForm)
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