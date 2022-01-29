import React from "react";
import { CarbonTable } from "../components/common/carbonTable";
import { Link, TableCell } from "carbon-components-react";
import { EmptyState } from "@carbon/ibm-products/lib/components";
import notFoundSvg from '../images/emptyState/not-found-bright.svg'

const ListCwTable = (props) => {
  const { onClick, onMoreDetails } = props;

  const headerDefinition = [
    {
      id: 1,
      header: "ID",
      key: "id",
      isSortHeader: true,
      isSortable: true,
      dataType: "id"
    },
    {
      id: 2,
      header: "Name",
      key: "name",
      isSortHeader: true,
      isSortable: true,
      dataType: "link",
      onClick
    },
    { id: 3, header: "Severity", key: "severity", dataType: "severity" },
    {
      id: 4,
      header: "Date",
      key: "date",
      isSortHeader: true,
      isSortable: true,
      sortDirection: "ASC",
      dataType: "string"
    },
    { id: 5, header: "Status", key: "status", dataType: "status" },
    {
      id: 6,
      header: "Categories/Tags/nnnnn/nnnnnnnn/nnnnn",
      key: "tags",
      dataType: "tagSet",
      colSpan: 3
    }
  ];
  const rows = [
    {
      id: "1",
      name: "Mark Sandler",
      severity: {
        minor: 0,
        major: 50,
        critical: 0,
        indeterminate: 2,
        warning: 1,
        information: 0
      },
      date: "01/07/2022",
      status: "in progress - missing grid/clues",
      tags: ["mythologie", "history"]
    },
    {
      id: "2",
      name: "Kirk Cuban",
      severity: {
        minor: 10,
        major: 0,
        critical: 0,
        indeterminate: 2,
        warning: 1,
        information: 0
      },
      date: "01/07/2022",
      status: "in progress - missing clues",
      tags: ["mythologie", "history"]
    },
    {
      id: "3",
      name: "Ashton Tomlinson",
      severity: {
        minor: 20,
        major: 0,
        critical: 0,
        indeterminate: 2,
        warning: 1,
        information: 0
      },
      date: "01/07/2022",
      status: "grid validated",
      tags: ["mythologie", "history"]
    },
    {
      id: "4",
      name: "Lori Jackson",
      severity: {
        minor: 0,
        major: 0,
        critical: 70,
        indeterminate: 2,
        warning: 1,
        information: 0
      },
      date: "01/07/2022",
      status: "grid game started",
      tags: ["mythology", "history", "geography", "funny", "math"]
    },
    {
      id: "5",
      name: "Brenda Steven",
      severity: {
        minor: 0,
        major: 0,
        critical: 30,
        indeterminate: 2,
        warning: 1,
        information: 0
      },
      date: "01/07/2022",
      status: "grid game finished",
      tags: ["mythologie", "history"]
    },
    {
      id: "6",
      name: "Kimberly Dan",
      severity: {
        minor: 0,
        major: 20,
        critical: 0,
        indeterminate: 2,
        warning: 1,
        information: 0
      },
      date: "01/07/2022",
      status: "in progress",
      tags: ["mythologie", "history"]
    },
    {
      id: "7",
      name: "Bill Freman",
      severity: {
        minor: 0,
        major: 0,
        critical: 0,
        indeterminate: 2,
        warning: 1,
        information: 0
      },
      date: "01/07/2022",
      status: "in progress",
      tags: ["mythologie", "history"]
    },
    {
      id: "8",
      name: "Grace Aliston Page",
      severity: {
        minor: 20,
        major: 30,
        critical: 0,
        indeterminate: 2,
        warning: 1,
        information: 20
      },
      date: "01/07/2022",
      status: "in progress",
      tags: ["mythologie", "history"]
    }
  ];
  const MoreDetailsLink = (props) => {
    const { resource, onClick } = props;
    return (
      <Link
        tabIndex="0"
        className={"table__link"}
        onClick={() => onClick(resource)}
      >
        More Details
      </Link>
    );
  };
  
  //TO TEST EMPTY STATE
  // const rows =[]

  const emptyState = <EmptyState
          className="empty-table"
          heading="Start by adding data assets"
          illustration={notFoundSvg}
          link={{
            href: 'https://www.carbondesignsystem.com',
            text: 'View documentation'
          }}
          subtext={<p>Click{' '}<span>Upload assets</span>{' '}to upload your data</p>}
          subtitle="Description text explaining why this section is empty."
          title="Empty state title"
        />

  return (
    <CarbonTable
      id={"cwListTable"}
      headerDefinition={headerDefinition}
      rows={rows}
      renderActions={
        onMoreDetails
          ? (resource) => (
              <TableCell>
                <MoreDetailsLink resource={resource} onClick={onMoreDetails} />
              </TableCell>
            )
          : null
      }
      emptyState={emptyState}
      pagination={true}
      title="Carbon Table"
      description="With batch actions, pagination, sort, side panel, tags , status"
    />
  );
};

export default ListCwTable;
