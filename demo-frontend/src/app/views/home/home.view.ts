import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.scss']
})
export class HomeView implements OnInit {

  springBootVersion$: Observable<string>;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getSpringBootVersion();
  }

  private getSpringBootVersion(): void {
    this.springBootVersion$ = this.homeService.getSpringBootVersion();
  }

}
