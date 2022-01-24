import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  /**
   * @private
   */
  private readonly http: HttpClient;

  /**
   * Constructor
   *
   * @param http
   */
  public constructor (http: HttpClient) {
    this.http = http;
  }

  /**
   * Get chat messages for list
   *
   * @returns {Observable<any>}
   */
  public getChatList (): Observable<any> {
    return this.http.get(`/user-center/official-account/v3/chat/chat-list`);
  }

  /**
   * Get customer fans group for detail
   */
  public getCustomerServiceGroup (): Observable<any> {
    return this.http.get(`/user-center/customer/v3/user-group-for-customer`);
  }

  /**
   * Get customer fans group for detail
   */
  public getCustomerServiceGroupDetail (id: number): Observable<any> {
    return this.http.get(`/user-center/customer/v3/user-group-for-customer/${id}`);
  }

  /**
   * Create customer fans group
   */
  public postCustomerServiceGroup (data: any): Observable<any> {
    // todo data type
    return this.http.post(`/user-center/customer/v3/user-group-for-customer`, data);
  }

  /**
   * Delete customer fans group
   */
  public deleteCustomerServiceGroup (id: number): Observable<any> {
    return this.http.delete(`/user-center/customer/v3/user-group-for-customer/${id}`);
  }
}
