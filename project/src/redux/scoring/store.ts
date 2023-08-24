// createStore弃用
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { rankReducer, playerReducer } from './mapLib/scoringReducer'
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// 计分相关变量

const scoringReducer = combineReducers({
    rank: rankReducer,
    players: playerReducer
})

export default createStore(scoringReducer, composeWithDevTools(applyMiddleware(thunk)))