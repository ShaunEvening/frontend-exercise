import React from "react";
import { Table as BaseTable, Flex } from "@radix-ui/themes";

export interface TableProps extends BaseTable.RootProps {
  children: React.ReactNode;
}

const TableRoot = (props: TableProps) => {
  return <BaseTable.Root {...props} variant="surface" />;
};

export interface TableFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// TODO: split Table Root into Root and Content so that Footer can be a valid child of Root
const TableFooter = ({ children }: TableFooterProps) => (
  <Flex
    justify="end"
    align="center"
    gap="2"
    minHeight="44px"
    px="3"
    py="2"
    width="100%"
    style={{ borderTop: "1px solid var(--gray-a5)" }}
  >
    {children}
  </Flex>
);

export const Table = {
  Root: TableRoot,
  Header: BaseTable.Header,
  Body: BaseTable.Body,
  Row: BaseTable.Row,
  ColumnHeaderCell: BaseTable.ColumnHeaderCell,
  RowHeaderCell: BaseTable.RowHeaderCell,
  Cell: BaseTable.Cell,
  Footer: TableFooter,
};
