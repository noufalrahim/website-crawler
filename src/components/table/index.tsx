/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface TableComponentProps {
  data: any;
  columns: any;
  itemsPerPage: any;
  setRenderItem?: any;
  setMatchUrl?: any;
}

export default function TableComponent({
  data,
  columns,
  itemsPerPage = 15,
  setRenderItem,
  setMatchUrl
}: TableComponentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClick = (url: string) => {
    setRenderItem('report');
    setMatchUrl(url);
  };

  return (
    <div className="overflow-hidden rounded-lg shadow-md w-full bg-gray-900 border border-gray-700">
      <Table className="w-full bg-gray-900 rounded-lg">
        <TableHeader className="bg-blue-900 text-white">
          <TableRow>
            {columns.map((col: any) => (
              <TableHead key={col.key} className="text-left text-gray-300 font-semibold p-3">
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row: any, index: any) => (
            <TableRow
              key={index}
              className="odd:bg-gray-850 even:bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              {columns.map((col: any) => (
                <TableCell key={col.key} className="p-3 text-gray-300" onClick={() => handleClick(row['url'])}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center p-4 bg-gray-800 border-t border-gray-700">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:bg-gray-800"
        >
          Previous
        </Button>
        <span className="text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:bg-gray-800"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
