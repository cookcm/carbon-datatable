import React, { useState, useEffect } from "react";

import { DataTable, Button, Link as CarbonLink } from "carbon-components-react";
import {
  TrashCan16 as Delete,
  Printer16 as Print,
  Launch16 as Launch,
  DataStructured32
} from "@carbon/icons-react";
import "@carbon/ibm-products/css/index.min.css";
import handleEnterKey from "./handleEnterKey";
import SeverityBreakdown from './severityBreakdown';

// import { useHistory } from " react-router-dom";
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
  TableToolbarSearch,
  TableBatchAction,
  TableBatchActions,
  TableSelectAll,
  TableSelectRow
} = DataTable;

const CELL_NAME_KEY = "name";
const CELL_DETAILS_KEY = "details";

const CarbonTable = (props) => {
  const { rows, headerDefinition, renderActions, renderOverflow } = props;

  const [open, setOpen] = useState(false);

  const [currentCell, setCurrentCell] = useState(null);
  const [cellId, setCellId] = useState(null);

  

  const createTableDefinitionMap = (headerDefinition) => {
    const tableDefinitionMap = {};
    if (headerDefinition && Array.isArray(headerDefinition)) {
      headerDefinition.forEach((def) => {
        if (def.key) {
          tableDefinitionMap[def.key] = def;
        }
      });
    }
    return tableDefinitionMap;
  };

  const [tableDefinitionMap, setTableDefinition] = useState(
    createTableDefinitionMap(headerDefinition)
  );

  useEffect(() => {
    setTableDefinition(createTableDefinitionMap(headerDefinition));
  }, [headerDefinition]);

  const renderRowCells = (row, rowIndex) => {
    return (
      <React.Fragment>
        {row.cells.map((cell, cellIndex) => {
          const cellDef = tableDefinitionMap[cell.info.header];
          let finalValue = cell.value;
          if (cellDef?.dataType === 'severity') {
            finalValue = '';
            if (cell.value) {
                finalValue = <SeverityBreakdown id={row.id + 'sev'} className='applications-table__severity-column' severityCounts={cell.value} maxVisible={3} OverflowType='Tag'/>;
            }
        } else if (cellDef?.dataType === "icon") {
            finalValue = <DataStructured32 className={"table__icon"} />;
            if (
              cell.value &&
              cellDef.getIcon &&
              typeof cellDef.getIcon === "function"
            ) {
              finalValue = cellDef.getIcon(cell.value, rowIndex);
            } else if (rows[rowIndex] && rows[rowIndex][cellDef.key]) {
              finalValue = rows[rowIndex][cellDef.key];
            }
            return (
              <TableCell className="table__icon-cell" key={cell.id}>
                {finalValue}
              </TableCell>
            );
          } else if (cellDef?.dataType === "link") {
            finalValue = "";
            if (
              cell.value &&
              cellDef.onClick &&
              typeof cellDef.onClick === "function"
            ) {
              finalValue = (
                <CarbonLink
                  tabIndex="0"
                  className={"table__link"}
                  onClick={() => cellDef.onClick(rows[rowIndex])}
                  onKeyDown={handleEnterKey}
                >
                  {cell.value}
                </CarbonLink>
              );
            }
          } else if (Array.isArray(finalValue)) {
            finalValue = finalValue.join(", ");
          }
          return <TableCell key={cell.id + cellIndex}>{finalValue}</TableCell>;
        })}
        {renderActions ? renderActions(rows[rowIndex]) : null}
        {renderOverflow ? renderOverflow(rows[rowIndex]) : null}
      </React.Fragment>
    );
  };

  const batchActionClickDelete = (selectedRows) => {
    console.log(selectedRows.length + "Deleted");
  };
  const batchActionClickPrint = (selectedRows) => {
    console.log(selectedRows.length + "Printed");
  };

 

  return (
    <div>
     
      <div id="cw-table">
        <DataTable rows={rows} headers={headerDefinition}>
          {({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            getToolbarProps,
            onInputChange,
            getBatchActionProps,
            getSelectionProps,
            selectedRows,
            getTableProps,
            getTableContainerProps
          }) => {
            const batchActionProps = getBatchActionProps();
            return (
              <TableContainer
                title="DataTable"
                description="With batch actions"
                {...getTableContainerProps()}
              >
                <TableToolbar {...getToolbarProps()}>
                  <TableBatchActions {...batchActionProps}>
                    <TableBatchAction
                      tabIndex={
                        batchActionProps.shouldShowBatchActions ? 0 : -1
                      }
                      renderIcon={Delete}
                      onClick={batchActionClickDelete(selectedRows)}
                    >
                      Delete
                    </TableBatchAction>
                    <TableBatchAction
                      tabIndex={
                        batchActionProps.shouldShowBatchActions ? 0 : -1
                      }
                      renderIcon={Print}
                      onClick={batchActionClickPrint(selectedRows)}
                    >
                      Print
                    </TableBatchAction>
                  </TableBatchActions>
                  <TableToolbarContent
                    aria-hidden={batchActionProps.shouldShowBatchActions}
                  >
                    <TableToolbarSearch
                      persistent="true"
                      tabIndex={
                        batchActionProps.shouldShowBatchActions ? -1 : 0
                      }
                      onChange={onInputChange}
                    />

                    <Button
                      size="small"
                      kind="primary"
                      href="/cw-create"
                      target="_blank"
                      // onClick={() => action("Add new row")}
                      renderIcon={Launch}
                    >
                      Creer une grille
                    </Button>
                  </TableToolbarContent>
                </TableToolbar>
                <Table {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      <TableSelectAll {...getSelectionProps()} />
                      {headers.map((header, i) => {
                        if (header.dataType === 'icon') {
                            // supress icon header
                            return null;
                        } else if (typeof header.colSpan !== 'undefined') {
                            return <TableHeader colSpan={header.colSpan} className={header.className || ''} key={header.id} {...getHeaderProps({ header })}>
                                {header.header}
                            </TableHeader>;
                        }
                        return <TableHeader key={header.id} className={header.className || ''} {...getHeaderProps({ header })}>
                            {header.header}
                        </TableHeader>;
                    })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(
                      (row, rowIndex) => (
                        
                        <TableRow key={row.id} {...getRowProps({ row })}>
                          <TableSelectRow {...getSelectionProps({ row })} />
                          {renderRowCells(row, rowIndex)}
                        </TableRow>
                      )
                      // (
                      //   <TableRow id={`row${i}`} key={i} {...getRowProps({ row })}>
                      //     <TableSelectRow {...getSelectionProps({ row })} />
                      //     {row.cells.map((cell) => {
                      //       const cellKey = cell.id.split(":")[1];
                      //       if (cellKey === CELL_NAME_KEY) {
                      //         return getNameCell(cell);
                      //       } else if (cellKey === CELL_DETAILS_KEY) {
                      //         return getDetailsCell(cell);
                      //       } else {
                      //         return getTableCell(cell);
                      //       }
                      //     })}
                      //   </TableRow>
                      // )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            );
          }}
        </DataTable>
      </div>
    </div>
  );
};

export default CarbonTable;
