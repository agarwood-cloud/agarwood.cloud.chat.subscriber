import { Component, Input, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { ToastService } from 'ng-devui/toast';
import { ChatSocketService } from '../services/chat-socket.service';
import { ActiveUserService } from '../services/active-user.service';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent implements OnInit {
  /**
   * height of chat content
   */
  @Input()
  public contentHeight: number = 0;

  /**
   * message content
   */
  public messageContent: string;

  /**
   * constructor
   *
   * @param chatSocket ChatSocketService
   * @param toast ToastService
   * @param activeUser ActiveUserService
   */
  public constructor (
      private readonly chatSocket: ChatSocketService,
      private readonly toast: ToastService,
      public activeUser: ActiveUserService
  ) {
  }

  public ngOnInit (): void {
    console.log('ChatContentComponent');
  }

  /**
   * send text message to user
   */
  public sendMessage (): void {
    // 如果空值，不能发送
    if (!this.messageContent) {
      this.toast.open({
        value: [{ severity: 'info', content: 'Please Enter Message!' }]
      });
      return;
    }

    // send to user
    const message = this.messageContent;
    const openid = this.activeUser.user.openid;
    this.chatSocket.sendTextMessage(openid, message);
    // 清空消息框
    this.messageContent = '';
  }

  /**
   * send image message by paste event
   */
  public sendClipboardImage (event): void {
    // Is the clipboardData feature supported
    if (!(event.clipboardData && event.clipboardData.items)) {
      return;
    }

    for (let i = 0, len = event.clipboardData.items.length; i < len; i++) {
      const item = event.clipboardData.items[i];
      // Is the item a file?
      if (item.kind === 'file') {
        const blob = item.getAsFile();
        if (blob.size === 0) {
          return;
        }
        const formData = new FormData();
        // 使用时间戳作为文件名称
        formData.append(`${dayjs().unix()}.${dayjs().millisecond()}`, blob);
        // 用于预览
        // const reader = new FileReader();
        // reader.onload = (evt) => {
        //   console.log(evt.target.result);
        // };
        // reader.readAsText(blob);

        this.chatSocket.uploadImage(formData).subscribe((res: any) => {
          // todo 待加入发送socket 消息
          // res 的格式为: { data: [{ imageUrl: 'http://xxx.com/xxx.png', mediaInfo: xxx }] }

          const openid = this.activeUser.user.openid;
          const mediaId = res.data[0].mediaId;
          const imageUrl = res.data[0].imageUrl;
          this.chatSocket.sendImageMessage(openid, mediaId, imageUrl);
        });

        // 阻止默认行为即不让剪贴板内容在div中显示出来
        event.preventDefault();
      }
    }
  }

  /**
   * Send message by keyup enter and press enter to wrap
   *
   * @param event
   */
  public keyUp (event) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }

  /**
   * Send message by keyup enter and press enter to wrap
   *
   * @param event
   */
  public keyDown (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }
}
