import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class SessionService {
  private currentUser: User = null;
  constructor() { }
  getCurrentUser() {
    return this.currentUser;
  }

  setCurrentUser(user: User) {
    console.log(user);
    this.currentUser = user;
    return user;
  }
}
