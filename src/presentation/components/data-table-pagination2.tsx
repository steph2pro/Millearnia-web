import { Table } from "@tanstack/react-table";

import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useMemo } from "react";

interface DataTablePaginationProps<TData> {
  count?: number;
  page?: number;
  per_page?: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (value: number) => void;

  table?: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
  count = 0,
  page = 1,
  per_page = 10,
  onPageChange,
  onRowsPerPageChange,
}: DataTablePaginationProps<TData>) {
  const pages = useMemo(() => {
    if (!count || !per_page) {
      return 1;
    }
    return Math.ceil(count / per_page);
  }, [per_page, count]);

  const canNext = useMemo(() => {
    return (page ?? 0) < pages;
  }, [page, pages]);

  const canPrev = useMemo(() => {
    return (page ?? 0) > 1;
  }, [page]);

  useEffect(() => {
    if (page > pages) {
      if (onPageChange) onPageChange(1);
    }
  }, [onPageChange, page, pages, count]);

  return (
    <div className="flex items-center justify-between px-6 py-2 overflow-hidden text-xs font-medium rounded-xl">
      <div className="flex items-center space-x-2">
        <p>Rows per page</p>

       <Select
          value={`${per_page}`}

          onValueChange={(value) => {
            onRowsPerPageChange(Number(value));
          }}
        >
          <SelectTrigger className="!h-8 !py-0 !my-0 w-[70px] bg-background [&_svg]:text-primary">
            <SelectValue  placeholder={per_page} />
          </SelectTrigger>

          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`} >
                {pageSize }
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        {table?.getFilteredSelectedRowModel().rows.length ? (
          <div>
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        ) : (
          <></>
        )}
        <div className="flex items-center justify-center ">
          Page {page} of {pages}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="tertiary"
          className="py-2 px-[14px] !disabled:opacity-30"
          onClick={() => {
            if (onPageChange) onPageChange(page - 1);
          }}
          disabled={!canPrev}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          className="py-2 px-[14px] !disabled:opacity-100 "
          onClick={() => {
            if (onPageChange) onPageChange(page + 1);
          }}
          disabled={!canNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
