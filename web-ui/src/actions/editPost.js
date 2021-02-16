export const SET_POST = 'EDIT_POST::SET_SUGGESTION';
export function setPost(post){
    return {
        type : SET_POST,
        payload : post
    }
}
export const SET_POST_WAS_EDITED = 'EDIT_POST::SET_POST_WAS_EDITED';
export function setPostWasEdited(editedState){ // boolean
    return {
        type : SET_POST_WAS_EDITED,
        payload : editedState
    }
}

export const RESET_STATE = 'EDIT_POST::RESET_STATE';
export function resetState() {
    return {
        type : RESET_STATE
    }
}
export const SET_TEXT = 'EDIT_POST::SET_TEXT';
export function setText(text){
    return {
        type : SET_TEXT,
        payload : text
    }
}

export const CANCEL = 'EDIT_POST::CANCEL';
export function cancel(){
    return {
        type : CANCEL
    }
}