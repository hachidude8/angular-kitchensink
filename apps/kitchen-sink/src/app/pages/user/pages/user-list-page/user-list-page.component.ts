import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ks-user-list-page',
  templateUrl: './user-list-page.component.html'
})
export class UserListPageComponent implements OnInit {

  showFilters = false;

  ngOnInit(): void {
    console.info(`${ this.constructor.name }::ngOnInit`);
  }
}
