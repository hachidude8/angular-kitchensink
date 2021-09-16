export interface PageDetails {
  pageIndex: number;
  previousPageIndex?: number;
  pageSize: number;
  length: number;
}

export function emptyPageDetails(): PageDetails {
  return {
    pageIndex: -1,
    previousPageIndex: -1,
    pageSize: 0,
    length: 0
  };
}
