import { LIB_OPTION } from "../const";
import { MapItem } from "@/interfaces";

//地图库相关的action

export const addLibAction = (data: MapItem[] = []) => ({ type: LIB_OPTION.ADD, data })
export const replaceLibAction = (data: MapItem[] = []) => ({ type: LIB_OPTION.REPLACE, data })
export const clearLibAction = (data: MapItem[] = []) => ({ type: LIB_OPTION.CLEAR, data })