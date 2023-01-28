import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  storeUserData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getValue(key: string) {
    return localStorage.getItem(key);
  }

  clearData() {
    localStorage.clear();

  }

}
