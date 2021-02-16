export const SET_TOP_NAVIGATION_ACTIVE_LINK = "UI::SET_TOP_NAVIGATION_ACTIVE_LINK";

export  function setTopNavigationActiveLink(link){
    return {
        type : SET_TOP_NAVIGATION_ACTIVE_LINK,
        payload : link
    }
}