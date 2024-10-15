import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Message } from '../../interfaces/message';
import { MessageComponent } from '../message/message.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { StackspotService } from '../../services/stackspot.service';
import { interval, switchMap, takeWhile } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MessageComponent, MessageInputComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  private stackspotService = inject(StackspotService);
  messages: Array<Message> = [];

  ngOnInit(): void {
    this.stackspotService.getToken().subscribe((response: any) => {
      console.log('Pegou o token');
    });
  }
  
  sendMessage(message: string) {
    if (message.trim()) {
      this.messages.push({ text: message, own: true });
      this.stackspotService.createExecution(message).subscribe((executionId: string) => {
        this.messages.push({ text: '', own: false, loading: true });
        this.pollForResponse(executionId);
      })
    }
  }

  pollForResponse(executionId: string) {
    interval(2000).pipe(
      switchMap(() => this.stackspotService.getExecution(executionId)),
      takeWhile((response: any) => response.progress.status !== 'COMPLETED', true)
    ).subscribe((response: any) => {
      if (response.progress.status === 'COMPLETED') {
        this.messages.pop();
        this.messages.push({ text: response.result, own: false });
      }
    });
  }
}
