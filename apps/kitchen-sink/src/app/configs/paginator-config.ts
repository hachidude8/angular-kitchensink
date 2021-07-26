import { Provider } from '@angular/core';
import { MAT_PAGINATOR_DEFAULT_OPTIONS, MatPaginatorDefaultOptions } from '@angular/material/paginator';


const options: MatPaginatorDefaultOptions = {
  pageSize: 25,
  pageSizeOptions: [25, 50, 100, 250]
}

export const PaginatorConfig: Provider = { provide: MAT_PAGINATOR_DEFAULT_OPTIONS, useValue: options };
