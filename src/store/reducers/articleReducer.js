
const initState = {
    allArticle: [], 
    myArticles: [], 
    pending: false
}

function articleReducer(state = initState, action) {
    if (action.type === 'GET_ALL_ARTICLES') { 
        return {
            ...state,
            allArticle: action.payload || []
        }
    }
    else if (action.type === 'GET_ONLY_MY_ARTICLES') { 
        return {
            ...state,
            myArticles: action.payload || []
        }
    }
    else if (action.type === 'CREATE_ARTICLE') {
        return {
            ...state,
            allArticle: state.allArticle.concat(action.payload)
        }
    }
    else if (action.type === 'UPDATE_ARTICLE') {
        return {
            ...state
        }
    }
    else if (action.type === 'DELETE_ARTICLE') {
        return {
            ...state,
            allArticle: state.allArticle.filter(article => article.title !== action.payload)
        }
    } 
    else {
        return state;
    }
}

export default articleReducer;