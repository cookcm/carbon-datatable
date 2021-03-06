import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  DataTable,
  Button,
  Link as CarbonLink,
  Pagination,
  TooltipIcon,
  Tooltip
} from "carbon-components-react";
import {
  TrashCan16 as Delete,
  Printer16 as Print,
  Launch16 as Launch,
  DataStructured32,
  Help16 as Help
} from "@carbon/icons-react";
import "@carbon/ibm-products/css/index.min.css";
import handleEnterKey from "../handleEnterKey";
import SeverityBreakdown from "../severityBreakdown";
import { TagsBreakdown } from "../tags-breakdown";
import { TagSet, StatusIcon } from "@carbon/ibm-products";
import { types as tagTypes } from "carbon-components-react/es/components/Tag/Tag";
import { getStatusIdentifiers } from "./../statusHelper";
import SmallToggle from "../smallToggle";

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
  const {
    id,
    title,
    description,
    headerDefinition,
    data,
    favorites,
    readyList,
    renderActions,
    renderFavorites,
    renderOverflow,
    renderPlayButton,
    emptyState,
    pagination,
    hasPagination,
    addButton,
    buttonText,
    withBatchActions,
    withSearchBar,
    maxVisibleTags,
    showFavoritesToggle,
    defaultShowFavoriteToggle,
    showReadyToggle,
    defaultShowReadyToggle
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pagination?.pageSize);
  const [totalItems, setTotalItems] = useState(data.length);

  const [startRow, setStartRow] = useState(0);
  const [endRow, setEndRow] = useState(pagination?.pageSize);
  const [filteredRows, setFilteredRows] = useState(data);
  const [showFavorites, setShowFavorites] = useState(defaultShowFavoriteToggle);
  const [showReady, setShowReady] = useState(defaultShowReadyToggle);

  const intersect = (a, b) => {
    var setA = new Set(a);
    var setB = new Set(b);
    var intersection = new Set([...setA].filter((x) => setB.has(x)));
    return Array.from(intersection);
  };

  useEffect(() => {
    let newRows = data;
    let filterList = [];
    let showAll = false;
    if (showFavorites && !showReady) {
      filterList = favorites;
    } else if (!showFavorites && showReady) {
      filterList = readyList;
    } else if (showFavorites && showReady) {
      filterList = intersect(favorites, readyList);
    } else {
      showAll = true;
    }
    if (!showAll) {
      if (filterList.length > 0) {
        newRows = data.filter((cw) => {
          return filterList.indexOf(cw.id) !== -1;
        });
      } else {
        newRows = [];
      }
    }

    setFilteredRows(newRows);
  }, [showFavorites, showReady, favorites, readyList, data]);

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

  const kinds = [
    "incomplete",
    "incomplete-errors",
    "in-progress",
    "validated",
    "unknown",
    "ready"
  ];

  const createHeader = (header, getHeaderProps) => {
    const props = getHeaderProps({ header });
    var headerProps = {
      className: header.className || "",
      key: header.id,
      isSortHeader: header?.isSortHeader || false,
      isSortable: header?.isSortable || false
    };
    let content = header.header;
    // if (header.dataType === 'icon') {
    //   // suppress icon header
    //   return null
    // }
    if (typeof header.colSpan !== "undefined") {
      headerProps = { ...headerProps, colSpan: header.colSpan };
    }
    if (header.key === "tags") {
      headerProps = { ...headerProps, className: "tag_column" };
    }
    if (header.hasTooltip) {
      const sevValues = [];
      kinds.map((kind) => {
        const sev = getStatusIdentifiers(kind);
        const SevIcon = sev.icon;
        const value = sev.name;
        sevValues.push(
          <div key={value} className="status-breakdown-tooltip-item">
            {SevIcon}
            <div className="status-breakdown-tooltip-item-text">{value}</div>
          </div>
        );
      });
      content = (
        <div style={{ display: "table" }}>
          <div
            style={{
              paddingRight: ".25rem",
              display: "table-cell",
              verticalAlign: "middle"
            }}
          >
            {header.header}
          </div>
          <div style={{ display: "table-cell", verticalAlign: "middle" }}>
            <Tooltip
              className="status-breakdown-tooltip"
              direction={"top"}
              renderIcon={Help}
            >
              {sevValues}
            </Tooltip>
          </div>
        </div>
      );
    }

    return (
      <TableHeader {...props} {...headerProps} {...header.headerProps}>
        {content}
      </TableHeader>
    );
  };

  const renderRowCells = (filRows, rows, row, rowIndex) => {
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
                    maxVisible={maxVisibleTags}
                  />
                </div>
              );
            }
          } else if (cellDef?.dataType === "play") {
            finalValue = renderPlayButton(rows[rowIndex]);
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
                  onClick={() => cellDef.onClick(cell)}
                  onKeyDown={handleEnterKey}
                >
                  {cell.value}
                </CarbonLink>
              );
            }
          } else if (cellDef?.dataType === "status") {
            const { iconDescription, kind, playTimes } = cell.value;
            const sev = getStatusIdentifiers(kind);
            const SevIcon = sev.icon;
            const playTimesCount = playTimes ? playTimes : 0;
            finalValue = (
              <div className="status-col">
                {SevIcon}
                {/* <StatusIcon
                  iconDescription={iconDescription}
                  kind={kind}
                  size={"md"}
                  theme={"light"}
                /> */}

                {iconDescription !== null && iconDescription !== undefined ? (
                  <div className="status-col-description">
                    {iconDescription}
                  </div>
                ) : null}
                {kind === "ready" ? (
                  <div className="status-col-playtimes">
                    {`${playTimesCount} times`}
                  </div>
                ) : null}
              </div>
            );
          } else if (Array.isArray(finalValue)) {
            finalValue = finalValue.join(", ");
          }
          return <TableCell key={cell.id + cellIndex}>{finalValue}</TableCell>;
        })}

        {renderFavorites ? renderFavorites(rows[rowIndex]) : null}
        {renderActions ? renderActions(filRows[rowIndex]) : null}
        {renderOverflow ? renderOverflow(filRows[rowIndex]) : null}
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

  const renderShowFavoritesToggle = () => {
    if (showFavoritesToggle) {
      return (
        <div className="table-header__toggle-container">
          <div
            className="toggle__label--small toggle__label--right"
            title="Show Favorites"
          >
            Show Favorites
          </div>
          <SmallToggle
            id="TableShowFavoriteToggle"
            aria-label="Show Favorites"
            labelA={""}
            labelB={""}
            toggled={showFavorites ? true : false}
            onToggle={() => setShowFavorites(!showFavorites)}
            minWidth={"3.75rem"}
          />
        </div>
      );
    }
    return null;
  };

  const renderShowReadyToggle = () => {
    if (showReadyToggle) {
      return (
        <div className="table-header__toggle-container">
          <div
            className="toggle__label--small toggle__label--right"
            title="Show Ready Grids"
          >
            Show Ready Grids
          </div>
          <SmallToggle
            id="TableShowReadyToggle"
            aria-label="Show Ready Grids"
            labelA={""}
            labelB={""}
            toggled={showReady ? true : false}
            onToggle={() => setShowReady(!showReady)}
            minWidth={"3.75rem"}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div id={id} className="cb-table">
        <DataTable
          rows={filteredRows.slice(startRow, endRow)}
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
                  {withBatchActions ? (
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
                  ) : null}
                  <TableToolbarContent
                    aria-hidden={batchActionProps.shouldShowBatchActions}
                  >
                    {withSearchBar ? (
                      <TableToolbarSearch
                        persistent="true"
                        tabIndex={
                          batchActionProps.shouldShowBatchActions ? -1 : 0
                        }
                        onChange={onInputChange}
                      />
                    ) : null}
                    {showReadyToggle ? renderShowReadyToggle() : null}
                    {showFavoritesToggle ? renderShowFavoritesToggle() : null}
                    {addButton ? (
                      <Button
                        size="small"
                        kind="primary"
                        href="/cw-create"
                        target="_blank"
                        // onClick={() => action("Add new row")}
                        renderIcon={Launch}
                      >
                        {buttonText}
                      </Button>
                    ) : null}
                  </TableToolbarContent>
                </TableToolbar>
                <Table {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      {withBatchActions ? (
                        <TableSelectAll {...getSelectionProps()} />
                      ) : null}
                      {headers.map((header, i) => {
                        return createHeader(header, getHeaderProps, i);
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, rowIndex) => (
                      <TableRow key={row.id} {...getRowProps({ row })}>
                        {withBatchActions ? (
                          <TableSelectRow {...getSelectionProps({ row })} />
                        ) : null}
                        {renderRowCells(filteredRows, rows, row, rowIndex)}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {rows.length === 0 ? emptyState : null}
                {hasPagination ? (
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
                    pageSizes={pagination?.pageSizes}
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

CarbonTable.propTypes = {
  id: PropTypes.string.isRequired, // Unique id for the table
  title: PropTypes.string,
  description: PropTypes.string, // Title displayed above the table
  headerDefinition: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Carbon title requires unqiue id for each header
      header: PropTypes.string, // The text displayed in the header
      key: PropTypes.string, // The value key matching the key of the data
      dataType: PropTypes.oneOf([
        // The type of data displayed in the cell
        "string",
        "link",
        "severity",
        "status",
        "tags",
        "tagSet",
        "play"
      ]),
      className: PropTypes.string, // className to set on the header
      getCellClassName: PropTypes.func, // getCellClassName can set the cell classname based on the row data
      getIcon: PropTypes.func, // If dataType icon, getIcon should be provided to return the icon based on the cell data and rowIndex
      onClick: PropTypes.func, // If dataType link, onClick should be provided to specific the link action based on cell data and rowIndex
      colSpan: PropTypes.number // Use to merge columns e.g. set to 2 for icon and text combination, should be applied to support text
    })
  ).isRequired,
  data: PropTypes.arrayOf(
    // Data for the table with matching keys defined in the header definition
    PropTypes.object
  ).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object),
  renderActions: PropTypes.func, // Render function to return node based on the row data
  renderFavorites: PropTypes.func,
  renderOverflow: PropTypes.func, // Render function to return node based on the row data
  renderPlayButton: PropTypes.func,
  emptyState: PropTypes.node, // Empty state to render, if no row data
  pagination: PropTypes.shape({
    pageSize: PropTypes.number,
    pageSizes: PropTypes.array
  }),
  isLoading: PropTypes.bool,
  withBatchActions: PropTypes.bool,
  withSearchBar: PropTypes.bool,
  maxVisibleTags: PropTypes.number,
  showFavoritesToggle: PropTypes.bool,
  defaultShowFavoriteToggle: PropTypes.bool,
  showReadyToggle: PropTypes.bool,
  defaultShowReadyToggle: PropTypes.bool,
  buttonText: PropTypes.string,
  addButton: PropTypes.bool
};

export default CarbonTable;
