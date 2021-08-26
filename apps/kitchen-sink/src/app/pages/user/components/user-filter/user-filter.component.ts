import { UserService } from '@aks/api/json-server';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ks-user-filter',
  templateUrl: './user-filter.component.html',
  styles: []
})
export class UserFilterComponent implements OnInit {

  constructor(protected userService: UserService) {
  }

  ngOnInit(): void {
    console.info('Filter do nothing');
  }

  applyFilters(): void {
    console.info('Applying that damned filters');
  }

}
