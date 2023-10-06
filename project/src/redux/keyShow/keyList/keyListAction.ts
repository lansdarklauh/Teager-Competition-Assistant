import { LIST_OPTION } from "../const";
import { KeyList } from "@/interfaces";

//地图库相关的action

export const addListAction = (data: KeyList) => ({ type: LIST_OPTION.ADD, data })
export const replaceListAction = (data: KeyList) => ({ type: LIST_OPTION.REPLACE, data })
export const clearListAction = (data: KeyList) => ({ type: LIST_OPTION.CLEAR, data })