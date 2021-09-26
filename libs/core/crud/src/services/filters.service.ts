import { Query } from '@aks/core/crud';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppliedFilter, FilterOptions, FilterParamsOptions } from '../filters';


@Injectable({ providedIn: 'root' })
export class FiltersService {

  private readonly source = new Subject<AppliedFilter>();

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loadRouteQuery();
  }

  set(query: Query, options: FilterOptions): void {
    this.source.next({ name: options.name, query });
    if (options.useParams) {
      this.setRouteParams(query, options.useParams);
    }
  }

  get(name: string): Observable<AppliedFilter> {
    return this.source.asObservable().pipe(
      filter(source => source.name === name)
    );
  }

  /**
   * Clears all stored queries
   */
  clear(): void {
    const nav: NavigationExtras = {
      relativeTo: this.route,
      queryParams: {},
      queryParamsHandling: ''
    };
    this.router.navigate([], nav);
  }

  private loadRouteQuery() {
    this.route.queryParamMap.subscribe(
      (value) => {
        console.info(`Route query param new value`, value.keys);
        console.info(value);
      },
      e => console.error(`Route query param error`, e),
      () => console.info(`Route query param map has ended`)
    );
  }

  private setRouteParams(query: Query, options: FilterParamsOptions): void {
    const queryParams = query.toObject();
    const { handling } = options;
    const nav: NavigationExtras = {
      queryParams,
      relativeTo: this.route,
      queryParamsHandling: handling
    };
    this.router.navigate([], nav);
  }
}
