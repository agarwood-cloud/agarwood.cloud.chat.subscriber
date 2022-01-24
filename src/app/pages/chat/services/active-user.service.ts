import { Injectable } from '@angular/core';
import { User } from './interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ActiveUserService {
  /**
   * The active user.
   */
  public user: User;
  public constructor () {
    console.log('ActiveUserService.constructor()');
  }

  /**
   * Set the active user.
   * @param user The user to set.
   */
  public clickUser (user: User) {
    console.log('active.user', user)
    this.user = user;
  }
}
