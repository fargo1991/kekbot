export const SET_SUGGESTIONS = "SUGGESTIONS::SET_SUGGESTIONS";
export function setSuggestions(suggestions){
    return {
        type : SET_SUGGESTIONS,
        payload : suggestions
    }
}

export const SET_SUGGESTIONS_LOADING = "SUGGESTIONS::SET_SUGGESTIONS_LOADING";
export function setSuggestionsLoading(loading){
    return {
        type : SET_SUGGESTIONS_LOADING,
        payload :  loading
    }
}

export const SET_FILTERS = "SUGGESTIONS::SET_FILTERS";
export function setFilters(filters){
    return {
        type : SET_FILTERS,
        payload : filters
    }
}

export const RESET_FILTERS = "SUGGESTIONS::RESET_FILTERS";
export function resetFilters(){
    return {
        type : RESET_FILTERS
    }
}

export const RESET_STATE = "SUGGESTIONS::RESET_STATE";
export function resetState(){
    return {
        type : RESET_STATE
    }
}

export const SET_FILTERS_COUNTS = "SUGGESTIONS::SET_FILTERS_COUNTS";
export function setFiltersCounts(data){
    return {
        type : SET_FILTERS_COUNTS,
        payload : data
    }
}

export const SET_PAGING = "SUGGESTIONS::SET_PAGING";
export function setPaging(paging){
    return {
        type : SET_PAGING,
        payload : paging
    }
}

export const RESET_PAGING = "SUGGESTIONS::RESET_PAGING";
export function resetPaging(){
    return {
        type : RESET_PAGING
    }
}