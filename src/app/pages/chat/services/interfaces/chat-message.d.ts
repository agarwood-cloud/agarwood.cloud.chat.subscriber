/**
 * @name ChatMessage
 */
export interface ChatMessage {
  id: string;
  openid: string;
  customerId: string;
  sender: string;
  msgType: string;
  data: {
    content: string;
  },
  createdAt: string;
  isRead: boolean;
}

/**
 * @name ChatMessage
 */
export interface LastMessage {
  id: string;
  openid: string;
  customerId: string;
  sender: string;
  msgType: string;
  data: {
    content: string;
  },
  createdAt: string;
  isRead: boolean;
  user: {
    id: string | number;
    officialAccountId: string | number;
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
