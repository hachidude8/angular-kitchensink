import { DeserializeResponseListFn, PageDetails, PageImpl } from '@aks/core/crud';
import { HttpResponse } from '@angular/common/http';
import { PageValueRegex, PAGINATION_DETAILS_HEADER, PREV_LINK, TOTAL_ITEMS_SIZE_HEADER } from './constants';


export const deserializeResponseList: DeserializeResponseListFn<HttpResponse<Record<string, unknown>[]>,
  Record<string, unknown>> = (response) => {
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
  const source = response.body || [];
  const details: PageDetails = {
    pageIndex: page,
    previousPageIndex: page - 1,
    pageSize: limit,
    length: total
  };
  return PageImpl.from(source, details);
};
