import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  public constructor () {
    console.log('no-useless-constructor');
  }

  public ngOnInit (): void {
    console.log('no-useless-constructor');
  }
}
