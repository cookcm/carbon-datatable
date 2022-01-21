import React, { useState } from 'react';
import { DataTable, Pagination } from "carbon-components-react";
const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch
} = DataTable;

const Table1 = (props) => {
  const {rows, headers} = props
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);

    const handlePagination= (event) => {
        const { page, pageSize } = event;
        if (page && pageSize) {
          setPage(page)
          setPageSize(pageSize)
        }
    }
    const sortRow = (
        cellA: any,
        cellB: any,
        { sortDirection, locale, sortStates, compare }: any
    ) => {
        if (sortDirection === sortStates.DESC) {
        return compare(cellB, cellA, locale);
        }
        return compare(cellA, cellB, locale);
    }

   return (
      <div>
        <DataTable
          rows={rows}
          headers={headers}
          sortRow={sortRow}
          render={({
            rows,
            headers,
            onInputChange,
            getTableContainerProps,
            getTableProps,
            getHeaderProps
          }) => (
            <TableContainer title="DataTable" {...getTableContainerProps()}>
              <TableToolbar>
                <TableToolbarContent>
                  <TableToolbarSearch onChange={e => onInputChange(e)} />
                </TableToolbarContent>
              </TableToolbar>
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map(header => (
                      <TableHeader
                        {...getHeaderProps({ header })}
                        isSortable={true}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.splice(page - 1, pageSize).map(row => {
                    return (
                      <TableRow>
                        {row.cells.map(cell => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        />
        <Pagination
          backwardText="Previous page"
          disabled={false}
          forwardText="Next page"
          isLastPage={false}
          itemsPerPageText="Items per page:"
          onChange={e => handlePagination(e)}
          pageInputDisabled={false}
          pageNumberText="Page Number"
          pageSize={3}
          pageSizes={[3, 5, 10]}
          pagesUnknown={false}
          totalItems={rows.length}
        />
      </div>
    );
}

export default Table1;


