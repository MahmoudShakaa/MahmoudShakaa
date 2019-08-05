import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemInterface, ItemsInterface } from './app.models';

@Injectable({
  providedIn: 'root'
})
export class AppApiService {
  mainURL: string;

  constructor(private http: HttpClient) {
    this.mainURL = 'https://kn4f3kklu4.execute-api.eu-west-1.amazonaws.com/default/jstasks';
  }

  getItems(offset: number, count: number) {
    return this.http.get<ItemsInterface[]>(`${this.mainURL}?offset=${offset}&count=${count}`);
  }

  getItem(id: number) {
    return this.http.get<ItemInterface>(`${this.mainURL}/item?id=${id}`);
  }
}
