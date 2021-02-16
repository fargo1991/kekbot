export  const SET_POSTS = 'POSTS::SET_POSTS';
export function setPosts(posts){
    return {
        type : SET_POSTS,
        payload : posts
    }
}

export const RESET_STATE = 'POSTS::RESET_STATE';
export function resetState(){
    return {
        type : RESET_STATE
    }
}

export const SET_LOADING = 'POSTS::SET_LOADING';
export function setLoading(loading){
    return {
        type : SET_LOADING,
        payload : loading
    }
}

export const SET_FILTERS = 'POSTS::SET_FILTERS';
export function setFilters(filters){
    return {
        type : SET_FILTERS,
        payload : filters
    }
}

export const SET_FILTERS_COUNTS = 'POSTS::SET_FILTERS_COUNTS';
export function setFiltersCounts(data){
    return {
        type : SET_FILTERS_COUNTS,
        payload : data
    }
}

export const RESET_FILTERS = 'POSTS::RESET_FILTERS';
export function resetFilters() {
    return {
        type : RESET_FILTERS
    }
}

export const SET_PAGING = 'POSTS::SET_PAGING';
export function setPaging(paging){
    return {
        type : SET_PAGING,
        payload : paging
    }
}

export const RESET_PAGING = 'POSTS::RESET_PAGING';
export function resetPaging(){
    return {
        type : RESET_PAGING
    }
}