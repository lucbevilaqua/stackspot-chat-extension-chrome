import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Message } from '../../interfaces/message';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input()
  message!: Message;
}
