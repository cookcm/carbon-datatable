import React from "react";
import PropTypes from "prop-types";

import { FavoriteFilled16, Favorite16 } from "@carbon/icons-react";
import { Button } from "carbon-components-react";

const FavoriteButton = (props) => {
  const { resourceId, addFavoriteCw, crosswords } = props;

  return (
    <div className="table__favorite-cell">
      <Button
        className="table__favorite"
        disabled={false}
        hasIconOnly
        // iconDescription={
        //     crosswords.includes(resourceId)
        //     ? "remove favorite"
        //     : "add favorite"
        // }
        kind="ghost"
        onClick={() => addFavoriteCw(resourceId)}
        // renderIcon={
        //     crosswords.includes(resourceId) ? FavoriteFilled16 : Favorite16
        // }
        renderIcon={Favorite16}
        size="default"
        tabIndex={0}
        tooltipAlignment="end"
        type="button"
      />
    </div>
  );
};

FavoriteButton.propTypes = {
  resourceId: PropTypes.string,
  favoriteCw: PropTypes.func,
  cwFavoriteIds: PropTypes.object
};

export default FavoriteButton;
