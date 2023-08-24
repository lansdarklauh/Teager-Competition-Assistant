import { MapItem } from "@/interfaces";
import { LIST_OPTION } from "../const";

type MapListAction = {
    type: string | null
    data: MapItem[]
}

//对地图池进行操作
export function mapListReducer(preState: MapItem[] = [], action: MapListAction) {
    if (!action) return preState
    const { type, data } = action
    switch (type) {
        case LIST_OPTION.REPLACE:
            return data
        case LIST_OPTION.ADD:
            return preState ? preState.concat(data) : data
        case LIST_OPTION.CLEAR:
            return []
        default:
            return preState.concat([])
    }
}