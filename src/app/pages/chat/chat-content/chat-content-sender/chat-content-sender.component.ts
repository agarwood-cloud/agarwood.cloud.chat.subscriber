import { Component, Input, OnInit } from '@angular/core';
import BenzAMRRecorder from 'benz-amr-recorder';
import { ChatMessage } from '../../services/interfaces/chat-message';
import { Customer } from '../../services/interfaces/customer';

@Component({
  selector: 'app-chat-content-sender',
  templateUrl: './chat-content-sender.component.html',
  styleUrls: ['./chat-content-sender.component.scss']
})
export class ChatContentSenderComponent implements OnInit {
  /**
   * play audio or not
   */
  public isPlayVoice: boolean = false;

  /**
   * message
   */
  @Input()
  public message: ChatMessage;

  /**
   * customer
   */
  public customer: Customer;

  public constructor () {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.customer = JSON.parse(userInfo);
    }
  }

  public ngOnInit (): void {
  }

  /**
   * play audio
   *
   * @param voice
   */
  public playVoice (voice: string): void {
    if (!voice) {
      return;
    }
    const amr = new BenzAMRRecorder();
    amr.initWithUrl(voice).then(() => {
      this.isPlayVoice = true;
      amr.play();
    });
    amr.onEnded(() => {
      this.isPlayVoice = false;
      console.log('播放结束');
    });
  }
}
