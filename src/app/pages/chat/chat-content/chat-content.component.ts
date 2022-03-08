import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import * as dayjs from 'dayjs';
import { ToastService } from 'ng-devui/toast';
import { ChatSocketService } from '../services/chat-socket.service';
import { ActiveUserService } from '../services/active-user.service';
import { ChatMessage } from '../services/interfaces/chat-message';
import { ImageMessage, NewsItemMessage, TextMessage, VideoMessage, VoiceMessage } from '../services/interfaces/message';
import { ChatService } from '../services/chat.service';

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
   * active openid for user
   */
  @Input()
  public set activeOpenid (openid: string) {
    if (openid) {
      // reset chat content
      this.chatMessage = [];
      this.getChatRecordMessage(openid);
    }
  }

  /**
   * message content
   */
  public messageContent: string;

  /**
   * chat header height
   */
  public chatContentHeaderHeight: number = 0;

  /**
   * message content height
   */
  public chatContentRecordHeight: number = 0;

  /**
   * bottom of message content height
   */
  public chatContentBottomHeight: number = 0;

  /**
   * user message content list
   */
  public chatMessage: ChatMessage[] = [];

  /**
   * is load more message
   */
  public isLoadMore: boolean = true;

  /**
   * is show send message
   */
  public isScroll: boolean = false;

  /**
   * Get chatContentHeader DOM element
   */
  @ViewChild('chatContentHeader')
  public set chatContentHeader (chatContentHeaderDom: ElementRef) {
    if (chatContentHeaderDom && chatContentHeaderDom.nativeElement) {
      this.chatContentHeaderHeight = chatContentHeaderDom.nativeElement.offsetHeight;
    }
  }

  /**
   * Get chatContentBottom DOM element
   */
  @ViewChild('chatContentBottom')
  public set chatContentBottom (chatContentBottomDom: ElementRef) {
    if (chatContentBottomDom && chatContentBottomDom.nativeElement && (!this.isScroll)) {
      this.chatContentBottomHeight = chatContentBottomDom.nativeElement.offsetHeight;

      // set chatContentRecordHeight
      setTimeout(() => {
        this.chatContentRecordHeight = this.contentHeight - this.chatContentHeaderHeight - this.chatContentBottomHeight;
      }, 100);
    }
  }

  /**
   * Scroll to bottom
   *
   * @param chatContentRecordDom
   */
  @ViewChild('chatContentRecord')
  public set chatContentRecord (chatContentRecordDom: ElementRef) {
    // todo: 如果是滚动加载，则不滑动到底部
    if (chatContentRecordDom && chatContentRecordDom.nativeElement) {
      chatContentRecordDom.nativeElement.scrollTop = chatContentRecordDom.nativeElement.scrollHeight;
    }
  }

  /**
   * constructor
   *
   * @param chatSocket ChatSocketService
   * @param toast ToastService
   * @param activeUser ActiveUserService
   * @param chatService ChatService
   */
  public constructor (
      private readonly chatSocket: ChatSocketService,
      private readonly toast: ToastService,
      public activeUser: ActiveUserService = null,
      private readonly chatService: ChatService
  ) {
  }

  public ngOnInit (): void {
    this.listenMessage();
  }

  /**
   * Setting Sidebar Height
   */
  @HostListener('window:resize', ['$event'])
  public setChatContentHeight (): void {
    setTimeout(() => {
      this.chatContentRecordHeight = this.contentHeight - this.chatContentHeaderHeight - this.chatContentBottomHeight;
    }, 100);
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
  public keyUp (event): void {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }

  /**
   * Send message by keyup enter and press enter to wrap
   *
   * @param event
   */
  public keyDown (event): void {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

  /**
   * listener socket message
   */
  public listenMessage (): void {
    // listen socket event (such as: text.message)
    const socketEvent = [
      'text.message',
      'image.message',
      'voice.message',
      'video.message',
      'file.message',
      'location.message',
      'news.item.message'
    ];
    socketEvent.forEach(event => {
      this.chatSocket.socket.on(event,
        (message:
               | TextMessage
               | VoiceMessage
               | VideoMessage
               | NewsItemMessage
               | ImageMessage) => {
          // set openid and customerId
          const openid = message.sender === 'user' ? message.fromUserId : message.toUserName;
          const customerId = message.sender === 'user' ? message.toUserName : message.fromUserId;

          const content: ChatMessage = {
            id: message.id,
            openid: openid,
            customerId: customerId,
            msgType: '',
            sender: message.sender,
            data: {},
            createdAt: message.createdAt,
            isRead: this.activeUser.user.openid === openid,
            noReadNum: 0 // todo, 这里要计算未读消息数量
          };

          if (message.msgType === 'text.message') {
            content.msgType = 'text.message';
            content.data.content = message.content;
          }

          if (message.msgType === 'image.message') {
            content.msgType = 'image.message';
            content.data = {
              imageUrl: message.imageUrl
            };
          }

          if (message.msgType === 'voice.message') {
            content.msgType = 'voice.message';
            content.data = {
              voiceUrl: message.voiceUrl
            };
          }

          if (message.msgType === 'video.message') {
            content.msgType = 'video.message';
            content.data = {
              videoUrl: message.videoUrl,
              title: message.title,
              description: message.description
            };
          }

          if (message.msgType === 'news.item.message') {
            content.msgType = 'news.item.message';
            content.data = {
              title: message.title,
              description: message.description,
              imageUrl: message.imageUrl,
              newsItemUrl: message.newsItemUrl
            };
          }

          this.chatMessage.push(content);
        });
    });
  }

  /**
   * Get Chat Message By Openid
   */
  public getChatRecordMessage (openid: string, page: number = 1, perPage: number = 20): void {
    this.chatService.getChatRecord(openid, page, perPage).subscribe((res: any) => {
      // this.chatMessage = res.data.list.reverse();
      this.chatMessage.push(...res.data.list.reverse());
    });
  }

  /**
   * Monitor scrolling and load data
   *
   * @param event
   */
  @HostListener('window:scroll', ['$event'])
  public loadMoreChatMessage (event?: Event): void {
    // client Height
    const clientHeight = window.innerHeight;
    console.log('clientHeight', clientHeight);

    // body height
    const bodyHeight = document.body.clientHeight;
    console.log('bodyH', bodyHeight);

    // 滚动的高度
    const scrollTop = document.documentElement.scrollTop;
    console.log('scrollTop', scrollTop);

    // 滚动，除了翻页，还要处理滚动条滚动到底部的情况
    if (bodyHeight - clientHeight - scrollTop < 10) {
      // if (!this.flag) {
      console.log('翻页');
      // 翻页
      // this.getChatRecordMessage(this.activeUser.user.openid, 2, 20);
      // }
    }
    console.log('loadMoreChatMessage', event);
  }
}
