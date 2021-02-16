import { SET_POSTS, RESET_STATE, SET_LOADING,
         RESET_FILTERS, RESET_PAGING, SET_FILTERS,
         SET_FILTERS_COUNTS, SET_PAGING } from "../actions/posts";

export const NEW = 'NEW';
export const ALL = 'ALL';
export const SCHEDULED = 'SCHEDULED';
export const DEFERRED = 'DEFERRED';
export const POSTED = 'POSTED';
export const DELETED = 'DELETED';

export const initialFilters = {
    [ NEW ] : false,
    [ ALL ] : false,
    [ SCHEDULED ] : false,
    [ DEFERRED ] : false,
    [ POSTED ] : false,
    [ DELETED ] : false
};

export const initialState = {
    posts : [],
    loading : true,
    filters : { ...initialFilters, [NEW] : true },
    filtersCounts : {
        new : 0,
        posted : 0,
        deferred : 0,
        deleted : 0,
        scheduled: 0,
        all : 0
    },
    paging : {
        pageNumber : 0,
        pageSize : 5,
        total : 0
    }
};

export function posts( state = initialState, action){

    switch (action.type) {

        case SET_POSTS:
            return {
                ...state,
                posts : action.payload,
                postsLoading : true
            };

        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };

        case SET_FILTERS:
            // MODE : conjunction or disjunction, default disjunction

            let { mode } = action.payload;
            if (!mode) mode = 'disjunction';

            return {
                ...state,
                filters : mode === 'conjunction' ?
                    { ...state.filters,  ...action.payload } :
                    { ...initialFilters, ...action.payload }
            };

        case RESET_FILTERS:
            return {
                ...state,
                filters : initialState.filters
            };

        case RESET_STATE:
            return initialState;

        case SET_FILTERS_COUNTS:
            return  {
                ...state,
                filtersCounts: action.payload,
                paging: {
                    ...state.paging,
                    total : Number(
                        action.payload[Object.keys(state.filters)
                            .find(key => state.filters[key]).toLowerCase()])
                }
            };

        case SET_PAGING:
            return {
                ...state,
                paging : {
                    ...state.paging,
                    ...action.payload
                }
            };

        case RESET_PAGING:
            return {
                ...state,
                paging: initialState.paging
            };

        default:
            return state;

    }

}