import { observable } from 'mobx';

export class UserStore {
  @observable userData = JSON.parse(localStorage.SVuserData);
}

export default new UserStore();
