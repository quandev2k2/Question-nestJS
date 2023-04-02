export class PaginationQuery {
  offset: number;
  limit: number;
  keyword: string;
  filters: { [name: string]: any };
  // sorts: { field: string, order: 'ASC' | 'DESC' };
}

export class PaginationResponse<T> {
  constructor(
    private items: T[],
    private total: number = 0,
    private todayData: {} = null,
    private thisMonthData: {} = null,
    private thisYearData: {} = null,
    private totalData: {} = null,
  ) {}
}
