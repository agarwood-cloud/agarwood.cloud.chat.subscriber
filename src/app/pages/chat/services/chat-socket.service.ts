import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Websocket } from '../../../../config/websocket';
import { ImageMessage, NewsItemMessage, TextMessage, VideoMessage, VoiceMessage } from './interfaces/message';

@Injectable()
export class ChatSocketService {
  /**
   * socket.io client
   */
  public socket: Socket;

  /**
   * @private
   */
  private readonly fromUserId: string = '';

  // init socket.io
  public constructor (private readonly http: HttpClient) {

    // init socket.io
    this.socketLogin(ChatSocketService.getFromUserId());
  }

  /**
   * Get officialAccountId params
   *
   * @private
   */
  private static getOfficialAccountId (): number|string {
    // todo
    return 'string';
  }

  /**
   * Get userId params
   *
   * @private
   */
  private static getFromUserId (): string {
    // fromUserId: this.userInfo.id,
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      return String(JSON.parse(userInfo).id);
    }

    // todo 未登陆的处理
    return '';
  }

  /**
   * socket connect
   *
   * @private
   */
  private socketLogin (userId: string): void {
    // login
    this.socket = io(`${Websocket.HOST}:${Websocket.PORT}/chat`, {
      auth: {
        Authorization: `${localStorage.getItem('token')}`,
        id: userId
      }
    });
  }

  /**
   * Send text message to tencent
   *
   * @param toUserName
   * @param content
   */
  public sendTextMessage (toUserName: string, content: string): void {
    const message: TextMessage = {
      officialAccountId: ChatSocketService.getOfficialAccountId(),
      toUserName: toUserName,
      fromUserId: ChatSocketService.getFromUserId(),
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss').toString(),
      msgType: 'text.message',
      content: content,
      sender: 'customer'
    };
    this.socket.emit('wechat.message', message);
  }

  /**
   * Send Image Message to tencent
   *
   * @param toUserName
   * @param mediaId
   * @param imageUrl
   */
  public sendImageMessage (toUserName: string, mediaId: string, imageUrl: string): void {
    const message: ImageMessage = {
      officialAccountId: ChatSocketService.getOfficialAccountId(),
      toUserName: toUserName,
      fromUserId: ChatSocketService.getFromUserId(),
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss').toString(),
      msgType: 'image.message',
      imageUrl: imageUrl,
      mediaId: mediaId,
      sender: 'customer'
    };

    // emit event
    this.socket.emit('wechat.message', message);
  }

  /**
   * Send Video Message To Tencent
   *
   * @param toUserName
   * @param videoUrl
   * @param mediaId
   * @param title
   * @param thumbMediaId
   * @param description
   */
  public sendVideoMessage (
    toUserName: string,
    videoUrl: string,
    mediaId: string,
    title: string,
    thumbMediaId: string,
    description: string
  ): void {
    const message: VideoMessage = {
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss').toString(),
      description: description,
      fromUserId: ChatSocketService.getFromUserId(),
      mediaId: mediaId,
      msgType: 'video.message',
      officialAccountId: ChatSocketService.getOfficialAccountId(),
      sender: 'customer',
      thumbMediaId: thumbMediaId,
      title: title,
      toUserName: toUserName,
      videoUrl: videoUrl
    };

    this.socket.emit('wechat.message', message);
  }

  /**
   * Send News Items Message To Tencent (Such as project items)
   *
   * @param toUserName
   * @param imageUrl
   * @param title
   * @param description
   * @param newsItemUrl
   */
  public sendNewsItemMessage (toUserName: string, imageUrl: string, title: string, description: string, newsItemUrl: string): void {
    const message: NewsItemMessage = {
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss').toString(),
      description: description,
      fromUserId: ChatSocketService.getFromUserId(),
      imageUrl: imageUrl,
      msgType: 'news.item.message',
      officialAccountId: ChatSocketService.getOfficialAccountId(),
      sender: 'customer',
      title: title,
      toUserName: toUserName,
      newsItemUrl: newsItemUrl
    };

    this.socket.emit('wechat.message', message);
  }

  /**
   * Send Voice Message to tencent
   *
   * @param toUserName
   * @param voiceUrl
   * @param mediaId
   */
  public sendVoiceMessage (toUserName: string, voiceUrl: string, mediaId: string): void {
    const message: VoiceMessage = {
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss').toString(),
      fromUserId: ChatSocketService.getFromUserId(),
      mediaId: mediaId,
      msgType: 'voice.message',
      officialAccountId: ChatSocketService.getOfficialAccountId(),
      sender: 'customer',
      toUserName: toUserName,
      voiceUrl: voiceUrl
    };

    this.socket.emit('wechat.message', message);
  }

  /**
   * upload image
   *
   * @param image FormData
   */
  public uploadImage (image: FormData): Observable<Object> {
    return this.http.post('/user-center/official-account/v3/chat/upload-image', image);
  }
}
