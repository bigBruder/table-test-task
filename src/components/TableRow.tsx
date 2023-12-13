import { Person } from "@/utils/makeData";
import { Row } from "@tanstack/react-table";
import { FC } from "react";
import { TableItem } from "./TableItem";

type Props = {
  row: Row<Person>;
};

export const TableRow: FC<Props> = ({ row }) => {
  return (
    <tr key={row.id} className="tableRow">
      {row.getVisibleCells().map((cell) => {
        return <TableItem cell={cell} key={cell.id} />;
      })}
    </tr>
  );
};
