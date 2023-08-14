// createStore弃用
import { legacy_createStore as createStore } from "redux";
import { mapLibReducer } from './mapReducer'

// 地图池相关变量
const mapLib = createStore(mapLibReducer)

export default { mapLib }