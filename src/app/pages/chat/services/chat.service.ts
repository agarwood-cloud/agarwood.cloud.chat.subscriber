import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  /**
   * Constructor
   *
   * @param http
   */
  public constructor (private readonly http: HttpClient) {
  }

  /**
   * Get chat messages for list
   *
   * @returns {Observable<Object>}
   */
  public getChatList (): Observable<Object> {
    return this.http.get('/user-center/official-account/v3/chat/chat-list');
  }

  /**
   * Get customer fans group for detail
   */
  public getCustomerServiceGroup (): Observable<Object> {
    return this.http.get('/user-center/customer/v3/user-group-for-customer');
  }

  /**
   * Get customer fans group for detail
   */
  public getCustomerServiceGroupDetail (id: number): Observable<Object> {
    return this.http.get(`/user-center/customer/v3/user-group-for-customer/${id}`);
  }

  /**
   * Create customer fans group
   */
  public postCustomerServiceGroup (data: any): Observable<Object> {
    // todo data type
    return this.http.post('/user-center/customer/v3/user-group-for-customer', data);
  }

  /**
   * Delete customer fans group
   */
  public deleteCustomerServiceGroup (id: number): Observable<Object> {
    return this.http.delete(`/user-center/customer/v3/user-group-for-customer/${id}`);
  }

  /**
   * Get User Info
   */
  public getUser (): Observable<Object> {
    return this.http.get('/user-center/official-account/v3/user');
  }

  /**
   * Get Chat Record Message For User
   *
   * @param openid
   * @param page
   * @param perPage
   */
  public getChatRecord (openid: string, page: number = 1, perPage: number = 20): Observable<Object> {
    return this.http.get(`/user-center/official-account/v3/chat/chat-record/${openid}`, {
      params: {
        page: page,
        perPage: perPage
      }
    });
  }
}
