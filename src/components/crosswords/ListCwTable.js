import React from "react";
import { CarbonTable } from "../common/carbonTable";
import { Link, TableCell } from "carbon-components-react";
import { EmptyState } from "@carbon/ibm-products/lib/components";
import notFoundSvg from "../../images/emptyState/not-found-bright.svg";
import FavoriteButton from '../../containers/favoriteButton'

const ListCwTable = (props) => {
  const { onClick, onMoreDetails, data } = props;

  const {headerDefinition, rows} = data
  
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
      renderFavorites={(resource) => (
        <TableCell className="asm--applications-table__favorite-cell">
          <FavoriteButton resourceId={resource.id} />
        </TableCell>
      )}
      emptyState={emptyState}
      pagination={true}
      title="Carbon Table"
      description="With batch actions, pagination, sort, side panel, tags , status"
      defaultPageSize={10}
      pageSizes={[3, 5, 10, 15]}
    />
  );
};

export default ListCwTable;
