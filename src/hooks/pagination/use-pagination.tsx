'use client';
import { useState } from 'react';

export const usePagination = (defaultPage: string) => {
  const [page, setPage] = useState(defaultPage);

  const handlePageChange = (newPage: number) => {
    window.history.pushState({}, '', `?page=${newPage}`);
    setPage(String(newPage));
  };

  return {
    page,
    onPageChange: handlePageChange,
  };
};
