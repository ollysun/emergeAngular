import {Postpaid} from './postpaidservice';

export class PostpaidCollection {
  private postpaids: Postpaid[] = [];
  constructor() {}
  addPostPaid(dev: Postpaid) {
    this.postpaids.push(dev);
  }
  getAll() {
    return this.postpaids;
  }
}
