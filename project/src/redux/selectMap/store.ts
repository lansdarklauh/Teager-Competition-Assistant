// createStore弃用
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { mapLibReducer } from './mapLib/mapLibReducer'
import { mapListReducer } from './mapList/mapListReducer'
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// 地图池相关变量

const mapReducer = combineReducers({
    mapLib: mapLibReducer,
    mapList: mapListReducer
})

export default createStore(mapReducer, composeWithDevTools(applyMiddleware(thunk)))