import { Component, Input, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { LastMessage } from '../../services/last-message';
import { User } from '../../services/user';

@Component({
  selector: 'app-chat-sidebar-user',
  templateUrl: './chat-sidebar-user.component.html',
  styleUrls: ['./chat-sidebar-user.component.scss']
})
export class ChatSidebarUserComponent implements OnInit {
  @Input()
  public user: User;

  @Input()
  public message: LastMessage;

  /**
   * 3 month later
   */
  public limit: number;

  /**
   * Set limit time for three month later
   */
  public constructor () {
    console.log('no-useless-constructor');
  }

  public ngOnInit () {
    // Set limit time for three month later
    this.limit = dayjs().add(3, 'month').unix();
  }
}
