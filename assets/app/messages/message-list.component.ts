import { Component, OnInit } from '@angular/core';

import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
   selector: 'app-message-list',
   template: `
      <div class="col-md-8 col-md-offset-2">
         <!-- $event contains the value passed through the event -->
         <app-message [inputMessage]="message" 
            (outputMessage)="message.content = $event"
            *ngFor="let message of messages"></app-message>
      </div>
   `
})

export class MessageListComponent implements OnInit {

   messages: Message[]

   constructor(private messageService: MessageService) { }

   ngOnInit() {
      this.messages = this.messageService.getMessages()
   }
}
