import { DeserializeResponseListFn, PagedResponse } from '@aks/core/crud';
import { HttpResponse } from '@angular/common/http';
import { PageValueRegex, PAGINATION_DETAILS_HEADER, PREV_LINK, TOTAL_ITEMS_SIZE_HEADER } from './constants';


export const deserializeResponseList: DeserializeResponseListFn<
  HttpResponse<Record<string, unknown>[]>,
  Record<string, unknown>
  > = (response) => {
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
  return new PagedResponse(response.body || [], page, limit, total, total > -1);
}
