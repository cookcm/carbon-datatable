import * as actionTypes from "../../actions/crosswords/actionTypes";

// const initialState = {
//     crosswords:{
//         id
//     }
// }
export const crosswords = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.CROSSWORDS_ADD_FAVORITE_ID:
      const { id } = payload;
      const newCwList = {
        id
      };
      const test = state.concat(newCwList) 
      return test;
      break;
    case actionTypes.CROSSWORDS_REMOVE_FAVORITE_ID:
      {
        const { id } = payload;
        return state.filter((item) => item.id !== id);
      }
      break;
    default:
      return state;
      break;
  }
};
