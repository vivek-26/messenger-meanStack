import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx'; // .map() & .catch()
import { Observable } from 'rxjs';

import { User } from './user.model';

@Injectable()
export class AuthService {

   constructor(private http: Http) { }

   // Sign up a user
   signUp(user: User) {
      const body = JSON.stringify(user)
      const headers = new Headers({
         'Content-Type': 'application/json'
      })
      return this.http.post('http://localhost:3000/user', body, { headers: headers })
         .map((response: Response) => response.json())
         .catch((error: Response) => Observable.throw(error.json()))
   }

   // Sign in a user
   signIn(user: User) {
      const body = JSON.stringify(user)
      const headers = new Headers({
         'Content-Type': 'application/json'
      })
      return this.http.post('http://localhost:3000/user/signin', body, { headers: headers })
         .map((response: Response) => response.json())
         .catch((error: Response) => Observable.throw(error.json()))
   }

   // Log out the user
   logOut() {
      localStorage.clear()
   }
}