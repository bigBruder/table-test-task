import { Person } from "@/utils/makeData";
import { Cell, flexRender } from "@tanstack/react-table";
import { FC } from "react";

type Props = {
  cell: Cell<Person, unknown>;
};

export const TableItem: FC<Props> = ({ cell }) => {
  return (
    <td key={cell.id}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};
