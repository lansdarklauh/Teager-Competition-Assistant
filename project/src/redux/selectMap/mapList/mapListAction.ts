import { LIST_OPTION } from "../const";
import { MapItem } from "@/interfaces";

//地图池相关的action

export const addListAction = (data: MapItem[] = []) => ({ type: LIST_OPTION.ADD, data })
export const replaceListAction = (data: MapItem[] = []) => ({ type: LIST_OPTION.REPLACE, data })
export const clearListAction = (data: MapItem[] = []) => ({ type: LIST_OPTION.CLEAR, data })