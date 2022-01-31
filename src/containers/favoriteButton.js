import React from "react";
import PropTypes from "prop-types";
import {useSelector, useDispatch} from 'react-redux'
import {Favorite16 } from "@carbon/icons-react";
import { Button } from "carbon-components-react";
import {addRemoveFavorite, selectFavorites} from '../stores/crosswordSlice'

import { ReactComponent as FavoriteFilled16 } from "../images/status/favorite--filled.svg";

const FavoriteButton = (props) => {
  const dispatch = useDispatch()
  const { resourceId } = props;



  const favorites = useSelector(selectFavorites)
  const slice = 'crossword'

  return (
    <div className="table__favorite-cell">
      <Button
        className="table__favorite"
        disabled={false}
        hasIconOnly
        iconDescription={
            favorites.includes(resourceId)
            ? "remove favorite"
            : "add favorite"
        }
        kind="ghost"
        onClick={() =>  dispatch(addRemoveFavorite(resourceId))}
        renderIcon={
            favorites.includes(resourceId) ? FavoriteFilled16: Favorite16
        }
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
