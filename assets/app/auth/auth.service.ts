import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx'; // .map() & .catch()
import { Observable } from 'rxjs';

import { User } from './user.model';
import { ErrorService } from './../errors/error.service';

@Injectable()
export class AuthService {

   constructor(private http: Http, private errorService: ErrorService) { }

   // Sign up a user
   signUp(user: User) {
      const body = JSON.stringify(user)
      const headers = new Headers({
         'Content-Type': 'application/json'
      })
      return this.http.post('http://localhost:3000/user', body, { headers: headers })
         .map((response: Response) => response.json())
         .catch((error: Response) => {
            this.errorService.handleError(error.json())
            return Observable.throw(error.json())
         })
   }

   // Sign in a user
   signIn(user: User) {
      const body = JSON.stringify(user)
      const headers = new Headers({
         'Content-Type': 'application/json'
      })
      return this.http.post('http://localhost:3000/user/signin', body, { headers: headers })
         .map((response: Response) => response.json())
         .catch((error: Response) => {
            this.errorService.handleError(error.json())
            return Observable.throw(error.json())
         })
   }

   // Log out the user
   logOut() {
      localStorage.clear()
   }

   // To check if user is logged in
   isLoggedIn() {
      return localStorage.getItem('token') !== null
   }
}