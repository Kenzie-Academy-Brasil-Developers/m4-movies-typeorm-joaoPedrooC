export type Pagination = {
  page: number;
  perPage: number;
  order: 'asc' | 'desc';
  sort: 'price' | 'duration';
  prevPage: string;
  nextPage: string;
}