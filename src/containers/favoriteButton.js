import { connect } from 'react-redux';
import { crosswordsAddFavoriteId } from './../actions/crosswords/crosswords';
import  FavoriteButtonComponent from './../components/common/favoriteButton';

const mapStateToProps = (state) => {
    return {
        crosswords: state.crosswords
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFavoriteCw: id => dispatch(crosswordsAddFavoriteId(id))
    };
};

const FavoriteButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(FavoriteButtonComponent);

export default FavoriteButton;
