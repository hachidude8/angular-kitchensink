import { JApiQuery, User, UserService } from '@aks/api/json-server';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'ks-user-details-page',
  templateUrl: './user-details-page.component.html',
  styles: []
})
export class UserDetailsPageComponent implements OnInit {

  source: User | undefined;
  error: Error | undefined;

  constructor(protected route: ActivatedRoute,
              protected crudService: UserService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  protected loadData(): void {
    this.route.paramMap.pipe(switchMap(params => {
      console.info('Params changed!');
      const id = params?.get('id') || 0;
      if (!id) {
        return throwError(new Error('Please provide an identifier to load details'));
      }
      return this.crudService.getOneBy(JApiQuery.fromObject({ id }));
    })).subscribe(
      data => this.afterDataLoaded(data as User),
      error => this.afterDataLoadError(error)
    );
  }
  protected afterDataLoaded(data: User): void {
    console.info('Loaded single item', data);
    this.source = data as User;
  }

  private afterDataLoadError(error: Error): void {
    this.error = error;
  }
}
