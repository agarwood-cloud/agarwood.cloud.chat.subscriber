import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-toolbar',
  templateUrl: './chat-toolbar.component.html',
  styleUrls: ['./chat-toolbar.component.scss']
})
export class ChatToolbarComponent implements OnInit {
  /**
   * height of chat toolbar
   */
  @Input()
  public chatToolbarHeight: number = 0;

  /**
   * height of chat toolbar header
   */
  public chatToolbarHeaderHeight: number = 54;

  /**
   * height of chat toolbar content
   */
  public tabContentHeight: number = 0;

  public constructor () {
    // console.log('ChatToolbarComponent constructor');
  }

  /**
   * product items by recommend.
   */
  public tabProduct: string | number = 'tabProduct';

  /**
   * order item
   */
  public tabOrder: string | number = 'tabOrder';

  /**
   * quick reply item
   */
  public tabQuick: string | number = 'tabQuick';

  /**
   * ngOnInit
   */
  public ngOnInit (): void {
    this.setToolbarHeight();
  }

  /**
   * change tab
   *
   * @param id
   */
  public activeTabChange (id: string | number): void {
    // console.log(id);
  }

  /**
   * Setting Sidebar Height
   */
  @HostListener('window:resize', ['$event'])
  public setToolbarHeight (): void {
    setTimeout(() => {
      this.tabContentHeight = this.chatToolbarHeight - this.chatToolbarHeaderHeight;
    }, 100);
  }
}
