"use client";

import "../components/UI/index.css";
import "../styles/main.css";
import "../styles/tableStyles.css";

import React from "react";

import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Table as ReactTable,
  useReactTable,
} from "@tanstack/react-table";

import { TableRow } from "@/components/TableRow";
import { ButtonMicro } from "@/components/UI/ButtonMicro";
import { StateLabel } from "@/components/UI/StateLabel";
import Image from "next/image";
import { makeData, Person } from "../utils/makeData";

import Complate from "../../public/labels/complete.svg";
import Time from "../../public/labels/time.svg";
import TimeIcon from "../../public/labels/time_mark.svg";

const DraftLabel = () => {
  return (
    <StateLabel
      bgColor="#C1C8D1"
      borderColor="#C1C8D1"
      icon={
        <Image src={TimeIcon} alt="label image" width={20} height={15}></Image>
      }
      text="Draft"
      textColor="6E7686"
    />
  );
};

const CompleteLabel = () => {
  return (
    <StateLabel
      bgColor="#B8EF81"
      borderColor="#B8EF81"
      icon={
        <Image src={Complate} alt="label image" width={20} height={20}></Image>
      }
      text="Complete"
      textColor="#478524"
    />
  );
};

const Pending = () => {
  return (
    <StateLabel
      bgColor="#FFE663"
      borderColor="#FFE663"
      icon={<Image src={Time} alt="label image" width={20} height={20}></Image>}
      text="Pending"
      textColor="#FF9900"
    />
  );
};

function Home() {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorFn: (row) => row.lastName,
        id: "Request ID",
        cell: (info) => <span>934040</span>,
        header: () => <span>Request ID</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "Progress",
        cell: (info) => {
          const { index } = info.row;
          if (index === 1) {
            return <CompleteLabel />;
          } else if (index === 2) {
            return <Pending />;
          } else {
            return <DraftLabel />;
          }
        },

        footer: (props) => props.column.id,
      },

      {
        accessorKey: "age",
        header: () => "Item",
        footer: (props) => props.column.id,
        cell: () => <span>Air Jordan 3 Off White</span>,
      },

      {
        accessorKey: "visits",
        header: () => <span>Created At</span>,
        footer: (props) => props.column.id,
        cell: () => <span>Dec 2, 11:45 PM</span>,
      },
    ],
    []
  );

  const [data, setData] = React.useState(() => makeData(100));

  return (
    <>
      <Table
        {...{
          data,
          columns,
        }}
      />
    </>
  );
}

function Table({
  data,
  columns,
}: {
  data: Person[];
  columns: ColumnDef<Person>[];
}) {
  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    debugTable: true,
  });

  console.log(table.getState());

  const startPaginatinoNum = table.getState().pagination.pageIndex + 1;
  const paginationSize = table.getState().pagination.pageSize;

  return (
    <div className="wrapper">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="tableHeader">
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="tableHeaderItem"
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {/* {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null} */}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return <TableRow row={row} key={row.id} />;
          })}
        </tbody>
      </table>

      <div className="menu">
        <div className="menu__page-info">
          <span>
            Viewing {startPaginatinoNum * paginationSize - paginationSize + 1}-
            {paginationSize * startPaginatinoNum} of{" "}
            {table.getPageCount() * paginationSize} results
          </span>
        </div>
        <div className="navigation">
          <ButtonMicro
            text="Previous"
            isDisabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          />
          <ButtonMicro
            text="Next"
            isDisabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          />
        </div>
      </div>
    </div>
  );
}
function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: ReactTable<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  );
}

export default Home;
