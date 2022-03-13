import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ChatSocketService } from './services/chat-socket.service';
import { ActiveUserService } from './services/active-user.service';

@Component({
  selector: 'app-chat',
  // template: `<router-outlet></router-outlet>`,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  /**
   * set sidebar height
   */
  public sidebarHeight: number = 0;

  /**
   * Get chatSidebarHeader DOM element
   */
  @ViewChild('chatSidebarHeader')
  public sidebarDomHeader: ElementRef;

  /**
   * constructor
   */
  public constructor (
      private readonly socket: ChatSocketService,
      public activeUser: ActiveUserService
  ) {
    // Getting ScreenSize
    this.getScreenSize();

    // Getting Permission
    this.webNotifications();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   */
  public ngOnInit (): void {
    // console.log('ChatComponent-ngOnInit', this.sidebarHeight);
  }

  /**
   * Listen for the window:resize event
   *
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  public getScreenSize (event?): void {
    this.sidebarHeight = window.innerHeight;
  }

  /**
   * Getting Permission for Web Notifications
   *
   * @param event
   */
  @HostListener('window:load', ['$event'])
  public webNotifications (event?): void {
     // todo 这里是加载完成要处理的
    // this.notification.createdOn
  }
}
