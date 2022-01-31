import React from "react";
import { useSelector } from "react-redux";
import { CarbonTable } from "./../components/common/carbonTable";
import {selectFavorites} from '../stores/crosswordSlice'
import { EmptyState } from "@carbon/ibm-products/lib/components";
import notFoundSvg from "../images/emptyState/not-found-bright.svg";

const FavoriteCw = (props) => {
  const { allCw } = props;
  const favorites = useSelector(selectFavorites);

  const newAllCw = allCw.map(({ severity, date, tags,status, ...rest }) => rest)

  let favoriteCw =[]
  if (favorites.length > 0){
    favoriteCw = newAllCw.filter((cw) => {
        return(favorites.indexOf(cw.id)!== -1);
    })
  }
  

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
    }
    // ,
    // {
    //   id: 5,
    //   header: "Status",
    //   key: "status",
    //   dataType: "status",
    //   hasTooltip: true,
    //   tooltipText: "status for the creation of the grid"
    // }
  ];

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
    <div>
      <CarbonTable
        id={"cwListTable"}
        headerDefinition={headerDefinition}
        rows={favoriteCw}
        emptyState={emptyState}
        pagination={true}
        title="Favorite grids"
        defaultPageSize={3}
        pageSizes={[3, 5, 10]}
      />
    </div>
  );
};

export default FavoriteCw;
