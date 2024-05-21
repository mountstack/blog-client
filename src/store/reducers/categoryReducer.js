
const initState = {
    allCategory: [] 
}

function categoryReducer(state = initState, action) {
    if (action.type === 'GET_ALL_CATEGORY') { 
        return {
            ...state,
            allCategory: action.payload || []
        }
    } 
    else {
        return state;
    }
}

export default categoryReducer;