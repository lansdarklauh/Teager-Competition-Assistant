import { MapItem } from "@/interfaces";
import { LIB_OPTION } from "../const";

type MapLibAction = {
    type: string | null
    data: MapItem[]
}

//对地图库进行操作
export function mapLibReducer(preState: MapItem[] = [], action: MapLibAction) {
    if (!action) return preState
    const { type, data } = action
    switch (type) {
        case LIB_OPTION.REPLACE:
            return data
        case LIB_OPTION.ADD:
            return preState ? preState.concat(data) : data
        case LIB_OPTION.CLEAR:
            return []
        default:
            return preState.concat([])
    }
}