import { START_LOADING, END_LOADING } from '../actions/actionTypes'

const createIsLoadingWithNamedType = (loadingName = '') =>  (state = false, action) => {
    switch (action.type) {
        case START_LOADING + '_' + loadingName:
            return true
        case END_LOADING + '_' + loadingName:
            return false
        default: 
            return state
    }
}

export default createIsLoadingWithNamedType;