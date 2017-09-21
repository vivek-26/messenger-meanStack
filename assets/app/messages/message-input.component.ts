import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
   selector: 'app-message-input',
   templateUrl: './message-input.component.html'
})

export class MessageInputComponent implements OnInit {
   message: Message
   constructor(private messageService: MessageService) { }

   onSubmit(form: NgForm): void {
      if (this.message) {
         // Edit Message
         this.message.content = form.value.content
         this.messageService.updateMessage(this.message)
            .subscribe(
            result => console.log(result)
            )
         this.message = null
      } else {
         // Create new Message
         const message = new Message(form.value.content, 'Vivek Kumar')
         this.messageService.addMessage(message)
            .subscribe(
            data => console.log(data),
            error => console.error(error)
            )
      }
      form.resetForm()
   }

   onClear(form: NgForm) {
      this.message = null
      form.resetForm()
   }

   ngOnInit() {
      this.messageService.messageIsEdit.subscribe(
         (message: Message) => this.message = message
      )
   }
}