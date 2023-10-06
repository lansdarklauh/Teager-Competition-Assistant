// createStore弃用
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { keyListReducer } from './keyList/keyListReducer'
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// 地图池相关变量

const keyReducer = combineReducers({
    keyList: keyListReducer,
})

export default createStore(keyReducer, composeWithDevTools(applyMiddleware(thunk)))