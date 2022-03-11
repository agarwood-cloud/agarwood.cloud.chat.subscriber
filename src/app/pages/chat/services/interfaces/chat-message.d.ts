/**
 * @name ChatMessage
 */
export interface ChatMessage {
  id: string|number;
  openid: string;
  customerId: string|number;
  sender: string;
  msgType: string;
  data: {
    content?: string;
    newsItemUrl?: string;
    imageUrl?: string;
    voiceUrl?: string;
    videoUrl?: string;
    title?: string;
    description?: string;
    url?: string;
    locationX?: number| string;
    locationY?: number| string;
    scale?: string;
    label?: string;
  },
  createdAt: string;
  isRead: boolean;
  noReadNum: number;
}

/**
 * @name LastMessage
 */
export interface LastMessage {
  id: string | number;
  openid: string;
  customerId: string;
  sender: string;
  msgType: string;
  data: {
    // 不同的消息内容，值不一样
    content: string;
    newsItemUrl?: string;
    imageUrl?: string;
    voiceUrl?: string;
    videoUrl?: string;
    title?: string;
    description?: string;
    url?: string;
    locationX?: number|string;
    locationY?: number|string;
    scale?: string;
    label?: string;
  },
  createdAt: string;
  isRead: boolean;
  // noReadNum: number;
  // todo 每一条消息不需要都带上用户的信息，可以单独获取
  user: {
    id: string | number;
    platformId: string | number;
    openid: string;
    customerId: string | number;
    customer: string;
    nickname: string;
    headImgUrl: string;
    subscribeAt: string;
    unsubscribeAt: string;
    subscribe: 'subscribe' | 'unsubscribe' | string;
    subscribeScene:
        | 'ADD_SCENE_SEARCH'
        | 'ADD_SCENE_ACCOUNT_MIGRATION'
        | 'ADD_SCENE_PROFILE_CARD'
        | 'ADD_SCENE_PROFILE_LINK'
        | 'ADD_SCENE_PROFILE_ITEM'
        | 'ADD_SCENE_PAID'
        | 'ADD_SCENE_WECHAT_ADVERTISEMENT'
        | 'ADD_SCENE_REPRINT'
        | 'ADD_SCENE_LIVESTREAM'
        | 'ADD_SCENE_CHANNELS'
        | 'ADD_SCENE_OTHERS';
    createdAt: string;
  }
}
