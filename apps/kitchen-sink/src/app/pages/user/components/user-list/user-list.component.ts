import { JApiQuery, User, UserService } from '@aks/api-jsonserver';
import { ComponentState, Page, PagedResponse } from '@aks/core';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'ks-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit, OnChanges {

  private displayedColumns: string[] = [];
  private pageDefinition: PageEvent | undefined;
  private query: JApiQuery;

  // Component Settings -> Make Class
  readonly settings = {
    loadOnInit: true,
    loadDisplayColumnsOnInit: true
  };
  readonly state = new ComponentState('loading');
  readonly source = this.createDataSource();

  constructor(protected userService: UserService) {
    this.query = JApiQuery.fromObject({ page: 1, limit: 25 });
  }

  @Input('query')
  set setQuery(query: Partial<JApiQuery>) {
    this.query = JApiQuery.fromObject(query);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { setQuery } = changes;
    if (setQuery && !setQuery.isFirstChange()) {
      this.loadData();
    }
  }

  ngOnInit(): void {
    this.preInitLoad().subscribe(
      data => this.postInitLoad(data),
      err => this.postInitLoadError(err)
    );
  }

  /**
   * Pre-initialization logic.
   * eg. Control state, load data like settings, preferences, permissions or any other required data before loading the
   * main data
   *
   * @return Returns void by default.
   */
  protected preInitLoad(): Observable<unknown | void> {
    return of(undefined);
  }

  /**
   * Post-initialization logic
   * Runs the required initialization logic
   *
   * @param data Pre-loaded data that may be received from the previous step
   */
  protected postInitLoad(data?: unknown): void {
    if (this.settings.loadOnInit) {
      this.loadData();
    }
    if (this.settings.loadDisplayColumnsOnInit) {
      this.loadDisplayColumns();
    }
  }

  /**
   * Captured exception after the init loading process
   */
  protected postInitLoadError(err: Error): void {
    console.debug(err);
  }

  /**
   * Returns the current value of the display columns
   */
  get displayColumns(): string[] {
    return this.displayedColumns;
  }

  get page(): PageEvent | undefined {
    return this.pageDefinition;
  }

  protected createDataSource(): MatTableDataSource<User> {
    return new MatTableDataSource<User>();
  }

  protected loadDisplayColumns(): void {
    this.setDisplayColumns([
      'firstName', 'lastName', 'gender', 'contact', 'actions'
      // 'avatar',
    ]);
  }

  protected setDisplayColumns(columns: string[]): void {
    this.displayedColumns = columns;
  }

  protected loadData(query?: JApiQuery): void {
    const appliedQuery = query || this.query;
    this.state.setState('loading');
    this.fetchData(appliedQuery).subscribe(
      (result) => this.afterDataLoad(result as PagedResponse<User>),
      err => this.afterDataLoadError(err)
    )
  }

  protected afterDataLoad(result: PagedResponse<User>): void {
    this.setPage(result.toPageEvent());
    this.setSourceData(result.getContents());
    this.state.setState('idle');
  }

  protected afterDataLoadError(error: Error): void {
    console.debug(error);
    this.state.setState('idle');
  }

  protected fetchData(query: JApiQuery): Observable<Page<User>> {
    return this.userService.getBy(query) as Observable<Page<User>>;
  }

  protected setPage(page: PageEvent): void {
    this.pageDefinition = page;
  }

  protected setSourceData(data: User[]): void {
    this.source.data = data;
  }

  onPage(page: PageEvent): void {
    this.loadData(JApiQuery.fromPageEvent(page));
  }

  onSort(sort: Sort): void {
    this.loadData(JApiQuery.fromPageEvent(this.page as PageEvent, sort));
  }

}
