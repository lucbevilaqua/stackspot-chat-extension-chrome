import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Message } from '../../interfaces/message';
import { MessageComponent } from '../message/message.component';
import { MessageInputComponent } from '../message-input/message-input.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MessageComponent, MessageInputComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  messages: Array<Message> = [];

  sendMessage(message: string) {
    if (message.trim()) {
      this.messages.push({ text: message, own: true });
      // Simular resposta
      setTimeout(() => {
        this.messages.push({ text: 'Resposta automática', own: false });
      }, 1000);
    }
  }
}
