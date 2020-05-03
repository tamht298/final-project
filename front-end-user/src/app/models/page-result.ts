import {PaginationDetail} from './pagination/pagination-detail';

export class PageResult<T> {
  data: T[];
  paginationDetails: PaginationDetail;
}
