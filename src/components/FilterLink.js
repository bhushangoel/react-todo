// FilterLink is now a container component --  provides behaviour and data to the Link component
/*
* As a container component, the filter link doesn't have its own markup. It delegates rendering to the link presentational component.
* In this case, it calculates its active prop by comparing its own filter prop with the visibility filter in the Redux chore state.
* The filter prop is the one that is passed to the filter link from the footer.
* The visibility filter corresponds to the currently chosen visibility filter that is held in Redux chore state. If they match, we want the link to appear active.
* */
import {NavLink} from "react-router-dom";

// action creator
const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})

/*const mapStateToLinkProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibility
})
const mapDispatchToLinkProps = (dispatch, ownProps) => ({
    onClick() {
        dispatch(setVisibilityFilter(ownProps.filter));
    }
})

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);*/

const FilterLink = ({filter, children}) => (
    <NavLink to={filter}>
        {children}
    </NavLink>
)


export default FilterLink;
