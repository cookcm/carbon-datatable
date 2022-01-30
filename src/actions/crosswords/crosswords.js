import * as actionTypes from './actionTypes';

export const crosswordsSetFavorites = (data, ids) => {
    return {
        type: actionTypes.CROSSWORDS_SET_FAVORITES,
        payload: { 
            data,
            ids
        }
    };
}


export const crosswordsAddFavoriteId = (id) => {
    return {
        type: actionTypes.CROSSWORDS_ADD_FAVORITE_ID,
        payload: { id }
    };
}

export const crosswordsRemoveFavoriteId = (id) => {
    return {
        type: actionTypes.CROSSWORDS_REMOVE_FAVORITE_ID,
        payload: { id }
    };
}
