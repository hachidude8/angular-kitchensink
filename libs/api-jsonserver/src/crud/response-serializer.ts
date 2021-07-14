import { PagedResponse } from '@aks/core';
import { HttpResponse } from '@angular/common/http';
import { TOTAL_ITEMS_SIZE_HEADER, PAGINATION_DETAILS_HEADER, PREV_LINK, PageValueRegex } from './constants';


export abstract class ResponseSerializer {
  abstract extractPagination(response: HttpResponse<unknown>): PagedResponse<unknown>;
}

export class HttpResponseSerializer extends ResponseSerializer {
  extractPagination(response: HttpResponse<unknown>): PagedResponse<unknown> {
    const { headers } = response;
    const totalSize = headers.get(TOTAL_ITEMS_SIZE_HEADER);
    const total = totalSize ? +totalSize : -1;

    let page = 1;
    let limit = 20;
    const paginationHeader = headers.get(PAGINATION_DETAILS_HEADER)?.trim() || '';
    if (paginationHeader) {
      const previousOrNext = paginationHeader.split(',')[1].trim();
      const extractedValue = PageValueRegex.exec(previousOrNext);
      if (extractedValue) {
        const [pageStr, limitStr] = extractedValue[0].split('&');
        limit = +limitStr.split('=')[1].trim();
        page = +pageStr.split('=')[1].trim();
        previousOrNext.includes(PREV_LINK) ? page++ : page--;
      }
    }
    const paged = new PagedResponse([], page, limit, total, total > -1);
    console.debug(paged);
    return paged;
  }
}
