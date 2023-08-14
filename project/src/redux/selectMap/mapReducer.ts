import { MapItem } from "@/interfaces";

type MapLibAction = {
    type: string | null
    data: MapItem[]
}

//对地图池进行操作
export function mapLibReducer(preState: MapItem[] = [], action: MapLibAction) {
    if (!action) return preState
    const { type, data } = action
    switch (type) {
        case 'replace':
            return data
        case 'add':
            return preState ? preState.concat(data) : data
        case 'clear':
            return []
        default:
            return data
    }
}