import { combineReducers } from "redux"; 
import articleReducer from "./articleReducer"; 
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({ 
    articles: articleReducer, 
    category: categoryReducer
}) 

export default rootReducer; 