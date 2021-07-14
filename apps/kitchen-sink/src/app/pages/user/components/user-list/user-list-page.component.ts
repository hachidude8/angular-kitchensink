import { JApiQuery, User, UserService } from '@aks/api-jsonserver';
import { PagedResponse } from '@aks/core';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ks-ks-user-list',
  templateUrl: './user-list-page.component.html',
  styles: [
  ]
})
export class UserListPage implements OnInit {
  readonly source = this.createDataSource();
  displayedColumns: string[] = [];
  page: PageEvent | undefined;

  constructor(protected userService: UserService) {
  }

  ngOnInit(): void {
    console.info('starting up HomeComponent');
    this.setDisplayColumns();
    this.loadData(JApiQuery.fromObject({ page: 1, limit: 25 }));
  }

  setDisplayColumns(): void {
    this.displayedColumns = [/*'avatar', */'firstName', 'lastName', 'gender', 'contact', 'actions']
  }

  protected createDataSource(): MatTableDataSource<User> {
    return new MatTableDataSource<User>();
  }

  protected loadData(query?: JApiQuery): void {
    this.userService.getBy(query).subscribe((result) => {
      this.page = (result as PagedResponse<User>).toPageEvent();
      this.source.data = (result as PagedResponse<User>).getContents();
      console.info(result);
    })
  }

  onPage(page: PageEvent): void {
    console.info(page);
    this.loadData(JApiQuery.fromPageEvent(page));
  }

  onSort(sort: Sort): void {
    console.info(sort);
    this.loadData(JApiQuery.fromPageEvent(this.page as PageEvent, sort));
  }
}
