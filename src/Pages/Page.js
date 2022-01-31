import React, { useState } from 'react';
import ListCwTable from "../components/crosswords/ListCwTable";
import TableSidePanel from "../components/common/TableSidePanel";
import { Column, Grid, Row } from 'carbon-components-react';

const Page = () => {

  
    
  const [sidePanelResource, setSidePanelResource] = useState(null);
 
  const onClick = (element) => {
    console.log('on Click on Page')
  }

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
    // {
    //   id: 3,
    //   header: "Severity",
    //   key: "severity",
    //   dataType: "severity"
    // },
    {
      id: 4,
      header: "Date",
      key: "date",
      isSortHeader: true,
      isSortable: true,
      sortDirection: "ASC",
      dataType: "string"
    },
    {
      id: 5,
      header: "Status",
      key: "status",
      dataType: "status",
      hasTooltip: true,
      tooltipText: "status for the creation of the grid"
    },
    {
      id: 6,
      header: "Categories",
      key: "tags",
      dataType: "tagSet",
      colSpan: 3
    }
  ];
  const rows = [
    {
      id: "1",
      name: "Laclos-1821",
      // severity: {
      //   minor: 0,
      //   major: 50,
      //   critical: 0,
      //   indeterminate: 2,
      //   warning: 1,
      //   information: 0
      // },
      date: "01/07/2022",
      status: {
        kind: "incomplete",
        iconDescription: "missing grid and clues"
      },
      tags: ["mythologie", "history"]
    },
    {
      id: "2",
      name: "Laclos-1822",
      // severity: {
      //   minor: 10,
      //   major: 0,
      //   critical: 0,
      //   indeterminate: 2,
      //   warning: 1,
      //   information: 0
      // },
      date: "01/07/2022",
      status: {
        kind: "incomplete-errors",
        iconDescription: "errors in clues"
      },
      tags: ["mythologie", "history"]
    },
    {
      id: "3",
      name: "Laclos-1823",
      // severity: {
      //   minor: 20,
      //   major: 0,
      //   critical: 0,
      //   indeterminate: 2,
      //   warning: 1,
      //   information: 0
      // },
      date: "01/07/2020",
      status: "grid validated",
      status: {
        kind: "ready",
        iconDescription: "played"
      },
      tags: ["mythologie", "history"]
    },
    {
      id: "4",
      name: "Morel-1821",
      // severity: {
      //   minor: 0,
      //   major: 0,
      //   critical: 70,
      //   indeterminate: 2,
      //   warning: 1,
      //   information: 0
      // },
      date: "01/08/2022",
      status: {
        kind: "in-progress",
        iconDescription: "crossword started"
      },
      tags: ["mythology", "history", "geography", "funny", "math"]
    },
    {
      id: "5",
      name: "Laclos-1825",
      // severity: {
      //   minor: 0,
      //   major: 0,
      //   critical: 30,
      //   indeterminate: 2,
      //   warning: 1,
      //   information: 0
      // },
      date: "01/07/2022",
      status: {
        kind: "unknown"
      },
      tags: ["mythologie", "history"]
    },
    {
      id: "6",
      name: "Laclos-1800",
      // severity: {
      //   minor: 0,
      //   major: 20,
      //   critical: 0,
      //   indeterminate: 2,
      //   warning: 1,
      //   information: 0
      // },
      date: "01/07/2022",
      status: {
        kind: "validated",
        iconDescription: "ready to play"
      },
      tags: ["mythologie", "history"]
    },
    {
      id: "7",
      name: "Laclos-1801",
      // severity: {
      //   minor: 0,
      //   major: 0,
      //   critical: 0,
      //   indeterminate: 2,
      //   warning: 1,
      //   information: 0
      // },
      date: "01/07/2022",
      status: {
        kind: "incomplete-errors",
        iconDescription: "errors in grid"
      },
      tags: ["mythologie", "history"]
    },
    {
      id: "8",
      name: "Laclos-1825",
      // severity: {
      //   minor: 20,
      //   major: 30,
      //   critical: 0,
      //   indeterminate: 2,
      //   warning: 1,
      //   information: 20
      // },
      date: "01/07/2022",
      status: {
        kind: "ready",
        iconDescription: "played",
        playTimes: 3
      },
      tags: ["mythologie", "history"]
    }
  ];

  const data = {
    headerDefinition,
    rows
  }
      
  return (
    <div>
      
      <TableSidePanel
            resource={sidePanelResource}
            onClose={() => setSidePanelResource(null)}
            onClick={onClick}
        />
      <Grid narrow>
         <Row>
            <Column className='bx--col-padding'>
              <h2>List of crosswords</h2>
              <ListCwTable
                onClick={onClick}
                onMoreDetails={(resource) => {
                  setSidePanelResource(resource);
                }}
                data={data}
              />
           </Column>
          </Row>
      </Grid>
    </div>
  );
};

export default Page;
