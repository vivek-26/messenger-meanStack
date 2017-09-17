import { Component } from '@angular/core';

import { Message } from './message.model';

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

export class MessageListComponent {
   messages: Message[] = [
      new Message('This is a sample message!', 'Vivek Kumar'),
      new Message('This is another sample message!', 'Vivek Kumar')
   ];
}
