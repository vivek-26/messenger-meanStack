import { Message } from './message.model';

export class MessageService {
   private messages: Message[] = []

   // Add a new message to list of messages
   addMessage(message: Message): void {
      this.messages.push(message)
      console.log(this.messages)
   }

   // Get all messages
   getMessages(): Message[] {
      return this.messages
   }

   // Delete a message from list of messages
   deleteMessage(message: Message): void {
      this.messages.splice(this.messages.indexOf(message), 1)
   }

}