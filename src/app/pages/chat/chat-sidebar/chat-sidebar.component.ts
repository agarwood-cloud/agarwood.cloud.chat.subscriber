import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ChatSocketService } from '../services/chat-socket.service';
import { Customer } from '../services/customer';

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
   * ChatSocketService Object
   *
   * @private
   */
  private readonly chatSocket: ChatSocketService;

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

  // todo temp
  public user;

  // todo temp
  public message;

  /**
   * initializes the ChatSidebarComponent
   *
   * @param chatSocket ChatSocketService
   */
  public constructor (chatSocket: ChatSocketService) {
    // socket is connected
    this.chatSocket = chatSocket;

    this.setSidebarHeight();
  }

  public ngOnInit (): void {
    // set customer params
    this.customer = JSON.parse(localStorage.getItem('userInfo'));

    console.log('this.socket', this.chatSocket);
    this.isSocketConnected();

    this.user = {
      id: 1111,
      officialAccountId: 2222,
      openid: '123456789',
      customerId: 'customer_id',
      customer: 'customer',
      nickname: 'nickname',
      headImgUrl: 'string',
      subscribeAt: 'string',
      unsubscribeAt: 'string',
      subscribe: 'subscribe',
      subscribeScene: 'ADD_SCENE_SEARCH',
      createdAt: '2022-01-21 00:02:10'
    };

    this.message = {
      id: 22222,
      content: '最后一条消息最后一条消息最后一条消息最后一条消息最后一条消息最后一条消息最后一条消息',
      createdAt: '2022-01-21 22:02:10'
    };
  }

  /**
   * Whether the websocket is connected
   */
  public isSocketConnected (): void {
    this.chatSocket.socket.on('connect', () => {
      console.log('connected');
      this.isOnline = true;
    });

    this.chatSocket.socket.on('disconnect', () => {
      console.log('disconnected');
      this.isOnline = false;
    });

    this.chatSocket.socket.on('connect_error', () => {
      console.log('connect_error');
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
}
