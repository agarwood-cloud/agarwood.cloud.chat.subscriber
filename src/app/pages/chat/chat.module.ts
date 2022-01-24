import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RelativeTimeModule } from 'ng-devui/relative-time';
import { ChatContentComponent } from './chat-content/chat-content.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatSidebarAccordionComponent } from './chat-sidebar/chat-sidebar-accordion/chat-sidebar-accordion.component';
import { ChatSidebarUserComponent } from './chat-sidebar/chat-sidebar-user/chat-sidebar-user.component';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';
import { ChatToolbarComponent } from './chat-toolbar/chat-toolbar.component';
import { ChatComponent } from './chat.component';
import { ChatSocketService } from './services/chat-socket.service';
import { SharedModule } from '../../@shared/shared.module';
import { CardModule, SplitterModule, TagsModule } from 'ng-devui';
import { ChatLastDayPipe } from './services/chat-last-day.pipe';
import { ChatService } from './services/chat.service';

@NgModule({
  providers: [
    ChatSocketService,
    ChatService
  ],
  declarations: [
    ChatComponent,
    ChatSidebarComponent,
    ChatContentComponent,
    ChatToolbarComponent,
    ChatSidebarUserComponent,
    ChatSidebarAccordionComponent,
    ChatLastDayPipe
  ],
  exports: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    RelativeTimeModule,
    SharedModule,
    SplitterModule,
    CardModule,
    TagsModule
  ]
})
export class ChatModule { }
