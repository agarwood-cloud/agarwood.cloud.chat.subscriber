import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ChatSocketService } from '../services/chat-socket.service';
import { Customer } from '../services/interfaces/customer';
import { ChatService } from '../services/chat.service';
import { LastMessage } from '../services/interfaces/chat-message';
import { User } from '../services/interfaces/user';
import { ActiveUserService } from '../services/active-user.service';
import {
  ImageMessage,
  LinkMessage, LocationMessage,
  NewsItemMessage,
  TextMessage,
  VideoMessage,
  VoiceMessage
} from '../services/interfaces/message';
import { Result } from '../services/interfaces/result';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.scss']
})
export class ChatSidebarComponent implements OnInit, AfterViewInit {
  /**
   * active Tab
   */
  public activeTab: string | number = 'chat-list';

  /**
   * customer service name
   */
  public customer: Customer;

  /**
   * Whether the websocket is connected
   */
  public isOnline = false;

  @Input()
  public sidebarHeight: number;

  /**
   * get sidebar header height
   */
  public sidebarHeaderHeight: number = 0;

  /**
   * get tab height for sidebar tab
   */
  public sidebarTabHeight: number = 0;

  /**
   * get header height for sidebar tab
   */
  public sidebarTabHeadHeight: number = 57;

  /**
   * get sidebar height by chat content
   */
  public sidebarTodayChatContentHeight: number = 0;

  /**
   * Get chatSidebarHeader DOM element
   */
  @ViewChild('chatSidebarHeader')
  public sidebarHeaderDom: ElementRef;

  /**
   * Get lastMessage for chat item
   */
  public lastMessage: LastMessage[] = [];

  /**
   * Get active user
   */
  public activeOpenid: string;

  /**
   * current page
   */
  public pageCurrent: number = 1;

  /**
   * has more data ?
   */
  public isLoadMore: boolean = true;

  /**
   * initializes the ChatSidebarComponent
   *
   * @param chatSocket ChatSocketService
   * @param chatService ChatService
   * @param activeUser ActiveUserService
   */
  public constructor (
      private readonly chatSocket: ChatSocketService,
      private readonly chatService: ChatService,
      private readonly activeUser: ActiveUserService
  ) {
    this.setSidebarHeight();

    this.getChatList();
  }

  public ngOnInit (): void {
    // set customer params
    this.customer = JSON.parse(localStorage.getItem('userInfo'));

    this.isSocketConnected();

    this.updateLastMessage();
  }

  /**
   * Whether the websocket is connected
   */
  public isSocketConnected (): void {
    this.chatSocket.socket.on('connect', () => {
      this.isOnline = true;
    });

    this.chatSocket.socket.on('disconnect', () => {
      this.isOnline = false;
    });

    this.chatSocket.socket.on('connect_error', () => {
      this.isOnline = false;
    });
  }

  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of a component's view.
   * It is invoked only once when the view is instantiated.
   *
   */
  public ngAfterViewInit () {
    // get sidebar header height
    this.sidebarHeaderHeight = this.sidebarHeaderDom.nativeElement.offsetHeight;
  }

  /**
   * Setting Sidebar Height
   */
  @HostListener('window:resize', ['$event'])
  public setSidebarHeight (): void {
    setTimeout(() => {
      this.sidebarTodayChatContentHeight = this.sidebarHeight - this.sidebarHeaderHeight - this.sidebarTabHeadHeight;
    }, 100);

    setTimeout(() => {
      this.sidebarTabHeight = this.sidebarHeight - this.sidebarHeaderHeight;
    }, 100);
  }

  /**
   * Get chat list
   *
   * @public
   */
  public getChatList (page: number = 1, perPage: number = 20): void {
    // 滚动到底部时，自动加载更多
    this.chatService.getChatList(page, perPage).subscribe((chatList: Result<LastMessage>) => {
      // 第一页必定要加载的
      if (page === 1 || chatList.data.pageCount > page) {
        console.log('chatList', chatList);
        this.lastMessage = [...chatList.data.list];
      } else {
        this.isLoadMore = false;
      }
    });
  }

  /**
   * active chat item
   *
   * @param user
   */
  public selectUser (user: User): void {
    // console.log('selectUser:', this.lastMessage);
    this.activeUser.clickUser(user);
    this.activeOpenid = user.openid;
    // console.log('activeOpenid:', this.activeOpenid);
  }

  /**
   * update last message
   */
  public updateLastMessage (): void {
    // listen socket event (such as: text.message)
    const socketEvent = [
      'text.message',
      'image.message',
      'voice.message',
      'video.message',
      'file.message',
      'link.message',
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
                    | ImageMessage
                    | LinkMessage
                    | LocationMessage
        ) => {
          this.lastMessage.forEach((item: LastMessage, index: number) => {
            if (
            // 如果是客服发的消息
              (message.sender === 'customer' && item.openid === message.toUserName) ||
                // 如果是用户发的消息
                (message.sender === 'user' && item.openid === message.fromUserName)
            ) {
              if (message.msgType === 'text.message') {
                item.data.content = message.content;
              }
              if (message.msgType === 'image.message') {
                // console.log('image.message:', message);
                item.data.content = '[图片消息]';
                item.data.imageUrl = message.imageUrl;
              }
              if (message.msgType === 'voice.message') {
                item.data.content = '[语音消息]';
                item.data.voiceUrl = message.voiceUrl;
              }
              if (message.msgType === 'video.message') {
                item.data.content = '[视频消息]';
                item.data.videoUrl = message.videoUrl;
              }
              if (message.msgType === 'news.item.message') {
                item.data.content = '[图文消息]';
                item.data.newsItemUrl = message.newsItemUrl;
                item.data.description = message.description;
                item.data.title = message.title;
              }
              if (message.msgType === 'link.message') {
                //  console.log('link.message:', message);
                item.data.content = '[链接消息]';
                item.data.title = message.title;
                item.data.description = message.description;
                item.data.url = message.url;
              }
              if (message.msgType === 'location.message') {
                item.data.content = '[位置消息]';
                item.data.locationX = message.locationX;
                item.data.locationY = message.locationY;
                item.data.scale = message.scale;
                item.data.label = message.label;
              }
              item.createdAt = message.createdAt;

              // 置顶
              this.lastMessageTop(index, this.lastMessage);
            }
          });

          // 如果openid不存在 todo: 待测试
          const filter = this.lastMessage.filter((item: LastMessage) => {
            if (message.sender === 'customer') {
              return item.openid === message.toUserName;
            } else {
              return item.openid === message.fromUserName;
            }
          });

          if (filter.length === 0) {
            let openid: string = '';
            if (message.sender === 'customer') {
               openid = message.toUserName;
            } else {
               openid = message.fromUserName;
            }
            this.chatService.getUser(openid).subscribe((user: Result<User>) => {
              let lastContent: string;
              if (message.msgType === 'text.message') {
                lastContent = message.content;
              }
              if (message.msgType === 'image.message') {
                lastContent = '[图片消息]';
              }
              if (message.msgType === 'voice.message') {
                lastContent = '[语音消息]';
              }
              if (message.msgType === 'video.message') {
                lastContent = '[视频消息]';
              }
              if (message.msgType === 'news.item.message') {
                lastContent = '[视频消息]';
              }
              if (message.msgType === 'location.message') {
                lastContent = '[位置消息]';
              }
              if (message.msgType === 'link.message') {
                lastContent = '[链接消息]';
              }
              const isMessage: LastMessage = {
                id: message.id,
                openid: message.sender === 'customer' ? message.toUserName : message.fromUserName,
                customerId: message.sender === 'user' ? message.toUserName : message.fromUserName,
                sender: message.sender,
                data: {
                  content: lastContent
                },
                createdAt: message.createdAt,
                msgType: message.msgType,
                isRead: false,
                user: user.data
              };

              this.lastMessage.unshift(isMessage);
            });
          }
        });
    });
  }

  /**
   * fixed top
   *
   * @param index
   * @param message
   */
  protected lastMessageTop (index: number, message: LastMessage[]) {
    if (index === 0) {
      return false;
    }
    // 删除当前数组元素，并将被删除的值添加到数组开头
    message.unshift(message.splice(index, 1)[0]);
    return message;
  }

  /**
   * load more chat message
   */
  public onloadMore (e: Event): void {
    // 如果存在数据，则请求数据
    if (this.isLoadMore) {
      this.getChatList(this.pageCurrent++, 20);
    }
    this.pageCurrent++;
  }
}
