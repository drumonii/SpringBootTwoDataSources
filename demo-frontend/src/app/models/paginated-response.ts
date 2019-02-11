export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
}
