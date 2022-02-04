import React, { useState, useEffect} from "react";
import { CarbonTable } from "../components/common/carbonTable";
import { Link, TableCell, Grid, Row, Column } from "carbon-components-react";
import { EmptyState } from "@carbon/ibm-products/lib/components";
import notFoundSvg from "../images/emptyState/not-found-bright.svg";
import FavoriteButton from "./FavoriteButton";
import { useSelector } from "react-redux";
import { selectFavorites } from "../stores/crosswordSlice";

const ListCwTable = (props) => {
  const { onClick, onMoreDetails, data } = props;
  const favorites = useSelector(selectFavorites);

  const { headerDefinition, rows } = data;


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

  const emptyState = (
    <EmptyState
      className="empty-table"
      heading="Start by adding data assets"
      illustration={notFoundSvg}
      link={{
        href: "https://www.carbondesignsystem.com",
        text: "View documentation"
      }}
      subtext={
        <p>
          Click <span>Upload assets</span> to upload your data
        </p>
      }
      subtitle="Description text explaining why this section is empty."
      title="Empty state title"
    />
  );

  return (
    <Grid fullWidth>
      <Row className="cw-table">
        <Column lg={16}>
          <CarbonTable
            id={"cwListTable"}
            headerDefinition={headerDefinition}
            rows={rows}
            favorites={favorites}
            renderActions={
              onMoreDetails
                ? (resource) => (
                    <TableCell>
                      <MoreDetailsLink
                        resource={resource}
                        onClick={onMoreDetails}
                      />
                    </TableCell>
                  )
                : null
            }
            renderFavorites={(resource) => (
              <TableCell className="asm--applications-table__favorite-cell">
                <FavoriteButton resourceId={resource.id} />
              </TableCell>
            )}
            emptyState={emptyState}
            pagination={true}
            title="List of crosswords"
            description="Type Laclos, Morel or other"
            defaultPageSize={10}
            pageSizes={[3, 5, 10, 15]}
            addButton={true}
            buttonText={"Create a grid"}
            withBatchAction={true}
            withSearchBar={true}
            maxVisibleTags={4}
            showFavoritesToggle={true}
            defaultShowFavoriteToggle={true}
          />
        </Column>
      </Row>
    </Grid>
  );
};

export default ListCwTable;
