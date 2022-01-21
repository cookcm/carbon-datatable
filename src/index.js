import React from "react";
import { render } from "react-dom";
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
const headers = [
  {
    key: "id",
    header: "ID"
  },
  {
    key: "name",
    header: "Name"
  },
  {
    key: "productA",
    header: "Product A"
  },
  {
    key: "productB",
    header: "Product B"
  },
  {
    key: "group",
    header: "Group name"
  },
  {
    key: "geo",
    header: "Geo"
  },
  {
    key: "role",
    header: "Role"
  }
];
const rows = [
  {
    id: "1",
    name: "Mark Sandler",
    productA: "Beginner",
    productB: "Expert",
    group: "Group Vincent Dornan",
    geo: "Asia Pacific",
    role: "UI Developer"
  },
  {
    id: "2",
    name: "Kirk Cuban",
    productA: "Expert",
    productB: "Beginner",
    group: "Group Keith Matt",
    geo: "Latin America",
    role: "UX"
  },
  {
    id: "3",
    name: "Ashton Tomlinson",
    productA: "Practicioner",
    productB: "Practicioner",
    group: "Group Ritviz",
    geo: "Asia Pacific",
    role: "Backend Developer"
  },
  {
    id: "4",
    name: "Lori Jackson",
    productA: "Expert",
    productB: "Beginner",
    group: "Group Drake Oliver ",
    geo: "Middle East and Africa",
    role: "Fullstack Developer"
  },
  {
    id: "5",
    name: "Brenda Steven",
    productA: "Beginner",
    productB: "Expert",
    group: "Group Jack Puth",
    geo: "Asia Pacific",
    role: "UI Developer"
  },
  {
    id: "6",
    name: "Kimberly Dan",
    productA: "Expert",
    productB: "Beginner",
    group: "Group Lina Scott Banez",
    geo: "Europe",
    role: "Frontend Developer"
  },
  {
    id: "7",
    name: "Bill Freman",
    productA: "Practicioner",
    productB: "Practicioner",
    group: "Group Drew Forman",
    geo: "Middle East and Africa",
    role: "UX"
  },
  {
    id: "8",
    name: "Grace Aliston Page",
    productA: "Expert",
    productB: "Beginner",
    group: "Group Kate Beck",
    geo: "Asia Pacific",
    role: "Lead Developer"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 3
    };
  }

  handlePagination(event) {
    const { page, pageSize } = event;
    if (page && pageSize) {
      this.setState({ page, pageSize });
    }
  }
  sortRow(
    cellA: any,
    cellB: any,
    { sortDirection, locale, sortStates, compare }: any
  ) {
    if (sortDirection === sortStates.DESC) {
      return compare(cellB, cellA, locale);
    }
    return compare(cellA, cellB, locale);
  }
  render() {
    const { page, pageSize } = this.state;
    return (
      <div>
        <DataTable
          rows={rows}
          headers={headers}
          sortRow={this.sortRow}
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
          onChange={e => this.handlePagination(e)}
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
}

render(<App />, document.getElementById("root"));
