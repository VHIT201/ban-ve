import { Table } from "@/components/ui/table";
import { FC, ReactNode } from "react";

const DataTableContent: FC<{ children: ReactNode }> = (props) => {
  return <Table>{props.children}</Table>;
};

export default DataTableContent;
