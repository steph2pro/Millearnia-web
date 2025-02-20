// TableRow.tsx
import {  TableCell } from "@/presentation/components/ui/table"
import { flexRender } from "@tanstack/react-table"

type TableRowProps = {
  row: any
}

export const TableRow: React.FC<TableRowProps> = ({ row }) => (
  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
    {row.getVisibleCells().map((cell) => (
      <TableCell key={cell.id}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </TableCell>
    ))}
  </TableRow>
)
