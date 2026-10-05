export interface CertPageResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasPrev: boolean;
  hasNext: boolean;
  pageIndicator: string;
}

export function getCertificationsPage<T>(
  items: T[],
  requestedPage: number,
  pageSize = 6
): CertPageResult<T> {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.max(0, Math.min(requestedPage, totalPages - 1));

  const start = currentPage * pageSize;
  const end = start + pageSize;
  const pageItems = items.slice(start, end);

  const pad = (n: number) => String(n).padStart(2, '0');
  const pageIndicator = `${pad(currentPage + 1)} / ${pad(totalPages)}`;

  return {
    items: pageItems,
    currentPage,
    totalPages,
    totalItems,
    hasPrev: currentPage > 0,
    hasNext: currentPage < totalPages - 1,
    pageIndicator,
  };
}
