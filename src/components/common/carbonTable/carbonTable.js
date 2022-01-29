import React, { useState, useEffect } from "react";

import {
  DataTable,
  Button,
  Link as CarbonLink,
  Pagination
} from "carbon-components-react";
import {
  TrashCan16 as Delete,
  Printer16 as Print,
  Launch16 as Launch,
  DataStructured32
} from "@carbon/icons-react";
import "@carbon/ibm-products/css/index.min.css";
import handleEnterKey from "../handleEnterKey";
import SeverityBreakdown from "../severityBreakdown";
import { TagsBreakdown } from "../tags-breakdown";
import { TagSet } from "@carbon/ibm-products";
import { types as tagTypes } from "carbon-components-react/es/components/Tag/Tag";


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
  const { rows, headerDefinition, renderActions, renderOverflow , emptyState, pagination, title, description} = props;
  const pageSizes = [3, 5, 10, 15];
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const [totalItems, setTotalItems] = useState(rows.length);

  const [startRow, setStartRow] = useState(0);
  const [endRow, setEndRow] = useState(pageSizes[0]);
  const [newRows, setNewRows] = useState(rows);

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
          if (cellDef?.dataType === "severity") {
            finalValue = "";
            if (cell.value) {
              finalValue = (
                <SeverityBreakdown
                  i
                  d={row.id + "sev"}
                  className="table__severity-column"
                  severityCounts={cell.value}
                  maxVisible={3}
                  OverflowType="Tag"
                />
              );
            }
          } else if (cellDef?.dataType === "tags") {
            finalValue = "";
            if (cell.value) {
              finalValue = (
                <div className="table__tag-column">
                  <TagsBreakdown tags={cell.value} />
                </div>
              );
            }
          } else if (cellDef?.dataType === "tagSet") {
            finalValue = "";
            if (cell.value) {
              const tags = [];
              for (let i = 0; i < cell.value.length; i++) {
                const label = cell.value[i];
                const type = tagTypes[i % tagTypes.length];

                tags.push({ type, label });
              }
              finalValue = (
                <div className="table__tag-set-column">
                  <TagSet
                    tags={tags}
                    allTagsModalSearchLabel="Filter tags"
                    allTagsModalTile="All tags"
                    allTagsModalSearchPlaceholderText="Filter tags"
                    showAllTagsLabel="Show all tags"
                    maxVisible={3}
                  />
                </div>
              );
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
              <TableCell className="cw_table__icon-cell" key={cell.id}>
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

  const onPageChanged = (evt) => {
    if (evt.page !== currentPage || evt.pageSize !== pageSize) {
      setCurrentPage(evt.page);
      setPageSize(evt.pageSize);
      setStartRow(evt.pageSize * (evt.page - 1));
      setEndRow(evt.pageSize * evt.page);
    }
  };

  //For translation
  // const getPageRangeText = (total) => {
  //   return total > 1 ? `of ${total} pages` : `of 1 page`;
  // };

  // const getItemsRangeText = (min, max, total) => {
  //   return `${min}-${max} of ${total} items`;
  // };

  const createHeader = (header, getHeaderProps) => {
    const props = getHeaderProps({ header });
    var headerProps = {
      className: header.className || "",
      key: header.id,
      isSortHeader: header?.isSortHeader || false,
      isSortable: header?.isSortable || false
    };

    if (typeof header.colSpan !== "undefined") {
      headerProps = { ...headerProps, colSpan: header.colSpan };
    }
    if (header.key ==="tags"){
      headerProps = { ...headerProps, className: "tag_column"}

    }

    return (
      <TableHeader {...props} {...headerProps} {...header.headerProps}>
        {header.header}
      </TableHeader>
    );
  };

  return (
    <div>
      <div id="cw-table">
        <DataTable
          rows={newRows.slice(startRow, endRow)}
          headers={headerDefinition}
        >
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
                title={title || null}
                description={description || null}
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
                        return createHeader(header, getHeaderProps, i);
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, rowIndex) => (
                      <TableRow key={row.id} {...getRowProps({ row })}>
                        <TableSelectRow {...getSelectionProps({ row })} />
                        {renderRowCells(row, rowIndex)}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {rows.length === 0 ? emptyState : null}
                {pagination ? (
                  <Pagination
                    backwardText="Previous page"
                    disabled={false}
                    forwardText="Next page"
                    itemsPerPageText="Items per page:"
                    onChange={onPageChanged}
                    pageInputDisabled={false}
                    pageNumberText="Page Number"
                    page={currentPage}
                    pageSize={pageSize}
                    pageSizes={pageSizes}
                    pagesUnknown={false}
                    totalItems={totalItems}
                  />
                ) : null}
              </TableContainer>
            );
          }}
        </DataTable>
      </div>
    </div>
  );
};

export default CarbonTable;
