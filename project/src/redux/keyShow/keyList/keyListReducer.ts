import { KeyList } from "@/interfaces";
import { LIST_OPTION } from "../const";

type keyListAction = {
    type: string | null
    data: KeyList[]
}

//对地图库进行操作
export function keyListReducer(preState: KeyList = {
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    shift: 160,
    ctrl: 162,
    alt: 164,
    r: 82
}, action: keyListAction) {
    if (!action) return preState || null
    const { type, data } = action
    switch (type) {
        case LIST_OPTION.REPLACE:
            return data
        case LIST_OPTION.ADD:
            return preState ? preState : data
        case LIST_OPTION.CLEAR:
            return {}
        default:
            return preState || null
    }
}