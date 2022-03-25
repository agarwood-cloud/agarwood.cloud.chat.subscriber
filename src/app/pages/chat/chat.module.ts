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
import {CardModule, ImagePreviewModule, SplitterModule, TagsModule, UploadModule} from 'ng-devui';
import { ChatLastDayPipe } from './services/chat-last-day.pipe';
import { ChatService } from './services/chat.service';
import { ActiveUserService } from './services/active-user.service';
import { ChatContentSenderComponent } from './chat-content/chat-content-sender/chat-content-sender.component';
import { ChatContentReceiverComponent } from './chat-content/chat-content-receiver/chat-content-receiver.component';
import { LazyLoadModule } from 'ng-devui/utils';

@NgModule({
  providers: [
    ChatSocketService,
    ChatService,
    ActiveUserService
  ],
  declarations: [
    ChatComponent,
    ChatSidebarComponent,
    ChatContentComponent,
    ChatToolbarComponent,
    ChatSidebarUserComponent,
    ChatSidebarAccordionComponent,
    ChatLastDayPipe,
    ChatContentSenderComponent,
    ChatContentReceiverComponent
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
        TagsModule,
        ImagePreviewModule,
        LazyLoadModule,
        UploadModule
    ]
})
export class ChatModule { }
