import React from 'react';
import CarbonTable from '../common/CarbonTable';
import { Link, TableCell } from 'carbon-components-react';

const ListCwTable = (props) => {
    const {
        onClick,
        onMoreDetails
    } = props;

    const headerDefinition = [
        { id: 1, header: 'ID', key: 'id', dataType: 'id'},
        { id: 2, header: 'Name', key: 'name', dataType: 'link', onClick },
        { id: 3, header: 'Severity', key: 'severity', dataType: 'severity' },
        { id: 4, header: 'Product B', key: 'productB', dataType: 'string'},
        { id: 5, header: 'Status', key: 'status', dataType: 'severity'},
        { id: 6, header: 'Tags', key: 'tags', dataType: 'tags', colSpan: 2}
    ];
    const rows = [
        {
          id: "1",
          name: "Mark Sandler",
          severity:  {minor: 0, major: 50, critical: 0, indeterminate: 2, warning: 1, information: 0},
          productB: "Expert",
          status: "in progress",
          tags: ["mythologie", "history"]
          
        },
        {
          id: "2",
          name: "Kirk Cuban",
          severity:  {minor: 10, major: 0, critical: 0, indeterminate: 2, warning: 1, information: 0},
          productB: "Beginner",
          status: "in progress",
          tags: ["mythologie", "history"]
        },
        {
          id: "3",
          name: "Ashton Tomlinson",
          severity:  {minor: 20, major: 0, critical: 0, indeterminate: 2, warning: 1, information: 0},
          productB: "Practicioner",
          status: "in progess",
          tags: ["mythologie", "history"]
        },
        {
          id: "4",
          name: "Lori Jackson",
          severity:  {minor: 0, major: 0, critical: 70, indeterminate: 2, warning: 1, information: 0},
          productB: "Beginner",
          status: "in progess",
          tags: ["mythologie", "history"]
        },
        {
          id: "5",
          name: "Brenda Steven",
          severity:  {minor: 0, major: 0, critical: 30, indeterminate: 2, warning: 1, information: 0},
          productB: "Expert",
          status: "in progess",
          tags: ["mythologie", "history"]
        },
        {
          id: "6",
          name: "Kimberly Dan",
          severity:  {minor: 0, major: 20, critical: 0, indeterminate: 2, warning: 1, information: 0},
          productB: "Beginner",
          status: "in progess",
          tags: ["mythologie", "history"]
        },
        {
          id: "7",
          name: "Bill Freman",
          severity:  {minor: 0, major: 0, critical: 0, indeterminate: 2, warning: 1, information: 0},
          productB: "Practicioner",
          status: "in progess",
          tags: ["mythologie", "history"]
        },
        {
          id: "8",
          name: "Grace Aliston Page",
          severity:  {minor: 20, major: 0, critical: 0, indeterminate: 2, warning: 1, information: 0},
          productB: "Beginner",
          status: "in progess",
          tags: ["mythologie", "history"]
        }
      ];
    const MoreDetailsLink = (props) => {
        const {
            resource,
            onClick
        } = props;
        return <Link
            tabIndex="0"
            className={'table__link'}
            onClick={() => onClick(resource)}>
            More Details
        </Link>;
    };
  return  (
        <CarbonTable
            id={'cwListTable'}
            headerDefinition={headerDefinition}
            rows={rows}
            renderActions={onMoreDetails ? (resource) => <TableCell>
                <MoreDetailsLink resource={resource} onClick={onMoreDetails}/>
            </TableCell> : null}
        />
  )
};

export default ListCwTable;
