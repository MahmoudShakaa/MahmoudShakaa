import { Component, OnInit } from '@angular/core';
import { AppApiService } from './app.service';
import { ItemInterface, ItemsInterface } from './app.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  items: ItemsInterface[];
  itemsLoaded = false;
  currentItem: ItemInterface;
  itemClicked = false;
  offSet = 0;
  count = 19;
  showItemLoader = false;

  constructor(private appService: AppApiService) {

  }

  ngOnInit() {
    this.appService.getItems(this.offSet, this.count).subscribe(data => {
        this.items = data;
      }, () => null,
      () => this.itemsLoaded = true);
  }

  loadItem(itemElement) {
    this.itemClicked = true;
    this.showItemLoader = true;
    this.appService.getItem(itemElement).subscribe(data => {
      this.currentItem = data;
    });
  }

  back() {
    this.itemClicked = false;
    this.currentItem = undefined;
  }

  onScroll(event) {
    console.log((event.target.scrollTop + event.target.offsetHeight) >= event.target.scrollHeight);
    if ((Math.round(event.target.scrollTop) + event.target.offsetHeight) >= event.target.scrollHeight) {
      this.offSet = this.offSet + this.count + 1;
      this.appService.getItems(this.offSet, this.count).subscribe(data => {
        this.items = this.items.concat(data);
      });
    }
  }

  imageLoaded() {
    this.showItemLoader = false;
  }
}
