import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<h3>{{ message }}</h3>`
})
export class HomeDesktopComponent implements OnInit {
  public message: string;

  constructor() {}

  public ngOnInit() {
    this.message = 'Hello';
  }
}
