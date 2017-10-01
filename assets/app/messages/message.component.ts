import { Component, Input } from '@angular/core';

import { MessageService } from './message.service';

import { Message } from './message.model';

@Component({
   selector: 'app-message',
   templateUrl: './message.component.html',
   styles: [
      `
   .author {
      display: inline-block;
      font-style: italic;
      font-size: 12px;
      width: 80%
   }
   .config {
      display: inline-block;
      text-align: right;
      font-size: 12px;
      width: 19%
   }
`
   ]
})

export class MessageComponent {
   // @Input - Assignable from outside
   @Input('inputMessage') messageFromAppComponent: Message

   constructor(private messageService: MessageService) { }

   onEdit() {
      this.messageService.editMessage(this.messageFromAppComponent)
   }

   onDelete() {
      this.messageService.deleteMessage(this.messageFromAppComponent)
         .subscribe(
         result => console.log(result)
         )
   }

   belongsToUser() {
      return localStorage.getItem('userId') == this.messageFromAppComponent.userId
   }
}