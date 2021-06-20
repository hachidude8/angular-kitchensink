import { CollectionViewer, DataSource as NgDataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';


export class DataSource<T> extends NgDataSource<T> {
  constructor() {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<readonly T[]> {
    return undefined;
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

}
