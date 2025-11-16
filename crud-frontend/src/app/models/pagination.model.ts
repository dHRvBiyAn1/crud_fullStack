export interface PaginatedResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}

export interface SortOption {
  field: string;
  label: string;
}
