import { Http, Headers, Response } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { Message } from './message.model';
import { ErrorService } from './../errors/error.service';

@Injectable()
export class MessageService {
   private messages: Message[] = []

   messageIsEdit = new EventEmitter<Message>()

   constructor(private http: Http, private errorService: ErrorService) { }

   // Add a new message to list of messages
   addMessage(message: Message): any {
      const postData = JSON.stringify(message)
      const headers = new Headers({ 'Content-Type': 'application/json' })
      const token = localStorage.getItem('token')
         ? `?token=${localStorage.getItem('token')}`
         : ''
      // .map() returns Observable by default; .catch() doesn't!
      return this.http.post(`http://localhost:3000/message${token}`, postData, { headers: headers })
         .map((response: Response) => {
            const resource = response.json().resource
            const message = new Message(resource.content,
               resource.user.firstName,
               resource.content._id,
               resource.user._id)
            this.messages.push(message)
            return message
         })
         .catch((error: Response) => {
            this.errorService.handleError(error.json())
            return Observable.throw(error.json())
         })
   }

   // Get all messages
   getMessages(): any {
      return this.http.get('http://localhost:3000/message')
         .map((response: Response) => {
            const messages = response.json().resource
            let trandformedMessages: Message[] = []
            for (let message of messages) {
               trandformedMessages.push(new Message(message.content,
                  message.user.firstName,
                  message._id,
                  message.user._id)
               )
            }
            this.messages = trandformedMessages
            return trandformedMessages
         })
         .catch((error: Response) => {
            this.errorService.handleError(error.json())
            return Observable.throw(error.json())
         })
   }

   // Edit a message
   editMessage(message: Message) {
      this.messageIsEdit.emit(message)
   }

   // Update a message
   updateMessage(message: Message) {
      const postData = JSON.stringify(message)
      const headers = new Headers({ 'Content-Type': 'application/json' })
      const token = localStorage.getItem('token')
         ? `?token=${localStorage.getItem('token')}`
         : ''
      return this.http.patch(`http://localhost:3000/message/${message.messageId}${token}`, postData, { headers: headers })
         .map((response: Response) => response.json())
         .catch((error: Response) => {
            this.errorService.handleError(error.json())
            return Observable.throw(error.json())
         })
   }

   // Delete a message from list of messages
   deleteMessage(message: Message): any {
      this.messages.splice(this.messages.indexOf(message), 1)
      const token = localStorage.getItem('token')
         ? `?token=${localStorage.getItem('token')}`
         : ''
      return this.http.delete(`http://localhost:3000/message/${message.messageId}${token}`)
         .map((response: Response) => response.json())
         .catch((error: Response) => {
            this.errorService.handleError(error.json())
            return Observable.throw(error.json())
         })
   }

}