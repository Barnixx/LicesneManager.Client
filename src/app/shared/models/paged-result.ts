import {Deserializable} from './deserializable';

export class PagedResult<T> implements Deserializable<PagedResult<T>> {

  items: T[];
  isEmpty: boolean;
  currentPage: number;
  resultsPerPage: number;
  totalPages: number;
  totalResults: number;

  deserialize(input: any): PagedResult<T> {
    return undefined;
  }
}
