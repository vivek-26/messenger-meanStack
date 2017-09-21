import { Http, Headers, Response } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { Message } from './message.model';

@Injectable()
export class MessageService {
   private messages: Message[] = []

   messageIsEdit = new EventEmitter<Message>()

   constructor(private http: Http) { }

   // Add a new message to list of messages
   addMessage(message: Message): any {
      this.messages.push(message)
      console.log(this.messages)
      const postData = JSON.stringify(message)
      const headers = new Headers({ 'Content-Type': 'application/json' })
      // .map() returns Observable by default; .catch() doesn't!
      return this.http.post('http://localhost:3000/message', postData, { headers: headers })
         .map((response: Response) => {
            const resource = response.json().content
            const message = new Message(resource.content, 'Vivek Kumar', resource._id, null)
            this.messages.push(message)
            return message
         })
         .catch((error: Response) => Observable.throw(error.json()))
   }

   // Get all messages
   getMessages(): any {
      return this.http.get('http://localhost:3000/message')
         .map((response: Response) => {
            const messages = response.json().resource
            let trandformedMessages: Message[] = []
            for (let message of messages) {
               trandformedMessages.push(new Message(message.content, 'Vivek Kumar', message._id, null))
            }
            this.messages = trandformedMessages
            return trandformedMessages
         })
         .catch((error: Response) => Observable.throw(error.json()))
   }

   // Edit a message
   editMessage(message: Message) {
      this.messageIsEdit.emit(message)
   }

   // Update a message
   updateMessage(message: Message) {
      const postData = JSON.stringify(message)
      const headers = new Headers({ 'Content-Type': 'application/json' })
      return this.http.patch(`http://localhost:3000/message/${message.messageId}`, postData, { headers: headers })
         .map((response: Response) => response.json())
         .catch((error: Response) => Observable.throw(error.json()))
   }

   // Delete a message from list of messages
   deleteMessage(message: Message): any {
      this.messages.splice(this.messages.indexOf(message), 1)
      return this.http.delete(`http://localhost:3000/message/${message.messageId}`)
         .map((response: Response) => response.json())
         .catch((error: Response) => Observable.throw(error.json()))
   }

}