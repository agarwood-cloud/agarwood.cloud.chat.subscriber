import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ChatSocketService } from '../services/chat-socket.service';
import { Customer } from '../services/interfaces/customer';
import {ChatService} from "../services/chat.service";
import {LastMessage} from "../services/interfaces/chat-message";

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
   * ChatService Object
   *
   * @private
   */
  private readonly chatService: ChatService;

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
   * initializes the ChatSidebarComponent
   *
   * @param chatSocket ChatSocketService
   * @param chatService ChatService
   */
  public constructor (chatSocket: ChatSocketService, chatService: ChatService) {
    // socket is connected
    this.chatSocket = chatSocket;

    this.chatService = chatService;

    this.setSidebarHeight();

    this.getChatList();
  }

  public ngOnInit (): void {
    // set customer params
    this.customer = JSON.parse(localStorage.getItem('userInfo'));

    this.isSocketConnected();
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
  public getChatList (): void {
    this.chatService.getChatList().subscribe(chatList => {
      this.lastMessage = chatList.data;
      console.log('chatList', this.lastMessage);
    });
  }
}
