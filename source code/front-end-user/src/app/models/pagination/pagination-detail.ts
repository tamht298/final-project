import {NextPage} from './next-page';
import {PreviousPage} from './previous-page';

export class PaginationDetail {
  totalCount: number;
  totalPage: number;
  pageCount: number;
  pageNumber: number;
  nextPage: NextPage;
  previousPage: PreviousPage;
  isFirstPage: boolean;
  isLastPage: boolean;
}
