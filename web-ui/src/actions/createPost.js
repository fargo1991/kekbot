export const SET_SUGGESTION = 'CREATE_POST::SET_SUGGESTION';
export function setSuggestion(suggestion){
    return {
        type : SET_SUGGESTION,
        payload : suggestion
    }
}
export const SET_POST_WAS_EDITED = 'CREATE_POST::SET_POST_WAS_EDITED';
export function setPostWasEdited(editedState){ // boolean
    return {
        type : SET_POST_WAS_EDITED,
        payload : editedState
    }
}

export const RESET_STATE = 'CREATE_POST::RESET_STATE';
export function resetState() {
    return {
        type : RESET_STATE
    }
}
export const SET_TEXT = 'CREATE_POST::SET_TEXT';
export function setText(text){
    return {
        type : SET_TEXT,
        payload : text
    }
}

export const CANCEL = 'CREATE_POST::CANCEL';
export function cancel(){
    return {
        type : CANCEL
    }
}