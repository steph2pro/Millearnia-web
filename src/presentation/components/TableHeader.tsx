// TableHeader.tsx
import { TableHead, TableHeader, TableRow } from "@/presentation/components/ui/table"
import { flexRender } from "@tanstack/react-table"

type TableHeaderProps = {
  table: any
}

export const TableHeader: React.FC<TableHeaderProps> = ({ table }) => (
  <TableHeader>
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          return (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          )
        })}
      </TableRow>
    ))}
  </TableHeader>
)
