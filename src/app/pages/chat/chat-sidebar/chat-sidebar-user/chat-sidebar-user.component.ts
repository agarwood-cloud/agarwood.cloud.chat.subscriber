import { Component, Input, OnInit } from '@angular/core';
import { LastMessage } from '../../services/interfaces/chat-message';

@Component({
  selector: 'app-chat-sidebar-user',
  templateUrl: './chat-sidebar-user.component.html',
  styleUrls: ['./chat-sidebar-user.component.scss']
})
export class ChatSidebarUserComponent implements OnInit {
  @Input()
  public lastMessage: LastMessage;

  /**
   * constructor
   */
  public constructor () {
  }

  public ngOnInit () {
  }
}
