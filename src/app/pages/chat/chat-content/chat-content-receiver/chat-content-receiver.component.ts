import { Component, OnInit } from '@angular/core';
import BenzAMRRecorder from 'benz-amr-recorder';

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

  public constructor() { }

  public ngOnInit(): void {
  }

  /**
   * play audio
   *
   * @param voice
   */
  public playVoice(voice: string): void {
    const amr = new BenzAMRRecorder();
    amr.initWithUrl(voice).then(() => {
      this.isPlayVoice = true;
      amr.play();
    });
    amr.onEnded(() => {
      this.isPlayVoice = false;
      console.log('播放结束');
    })
  }

}
