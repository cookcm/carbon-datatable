import React, { useState, useEffect } from "react";
import { CarbonTable } from "../components/common/carbonTable";
import { Link, TableCell, Grid, Row, Column, Button } from "carbon-components-react";
import { EmptyState } from "@carbon/ibm-products/lib/components";
import notFoundSvg from "../images/emptyState/not-found-bright.svg";
import FavoriteButton from "./FavoriteButton";
import { useSelector } from "react-redux";
import { selectFavorites } from "../stores/crosswordSlice";
import {PlayFilled16  as PlayFilled} from "@carbon/icons-react";

const ListCwTable = (props) => {
  const { onClick, onMoreDetails, data, onPlayGame } = props;
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

  const playGame = (resource) => {
    alert("play game " + resource.id)
  }

  const PlayButton = (props) => {
    const { resource } = props;
    let playIconEnabled = false
    resource?.cells.map((cell) => {
      if ( cell?.id.split(':')[1] === 'status'){
        let state = cell?.value?.kind
        if (state === 'ready' || state === 'validated'){
            playIconEnabled = true
        }
      }
    })
    
    return (
      <div className="table__play-button-container">
        <Button
          className="table__play-game-button"
          disabled={false}
          hasIconOnly
          iconDescription="play game"
          kind="ghost"
          onClick={() => playGame(resource)}
          renderIcon={PlayFilled}
          disabled={!playIconEnabled}
          size="default"
          tabIndex={0}
          tooltipAlignment="end"
          type="button"
        />
      </div>
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

  const pagination={  
    pageSize:10,
    pageSizes:[3, 5, 10, 15]        
}

  return (
    <Grid fullWidth>
      <Row className="cw-table">
        <Column lg={16}>
          <CarbonTable
            id={"cwListTable"}
            title="List of crosswords"
            headerDefinition={headerDefinition}
            data={rows}
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
              <TableCell className="table__favorite-cell">
                <FavoriteButton resourceId={resource.id} />
              </TableCell>
            )}
            renderPlayButton={(resource ) => <PlayButton resource={resource} />}
            emptyState={emptyState}
            hasPagination={true}
            pagination={pagination}
            description="Type Laclos, Morel or other"
            addButton={true}
            buttonText={"Create a grid"}
            withBatchActions={true}
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
