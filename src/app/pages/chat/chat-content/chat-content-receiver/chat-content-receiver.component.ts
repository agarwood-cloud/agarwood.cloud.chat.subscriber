import { Component, Input, OnInit } from '@angular/core';
import BenzAMRRecorder from 'benz-amr-recorder';
import { User } from '../../services/interfaces/user';
import { ChatMessage } from '../../services/interfaces/chat-message';

@Component({
  selector: 'app-chat-content-receiver',
  templateUrl: './chat-content-receiver.component.html',
  styleUrls: ['./chat-content-receiver.component.scss']
})
export class ChatContentReceiverComponent implements OnInit {
  /**
   * play audio or not
   */
  public isPlayVoice: boolean = false;

  /**
   * user
   */
  @Input()
  public user:User;

  /**
   * message
   */
  @Input()
  public message: ChatMessage;

  public constructor () { }

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
    });
  }
}
