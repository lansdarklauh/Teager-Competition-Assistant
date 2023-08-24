import { Player } from "@/interfaces";
import { PLAYER_OPTION, RANK_OPTION } from "../const";

type PlayerAction = {
    type: string | null
    data: Player[]
}

type RankAction = {
    type: string | null
    data: number[]
}

//对名次进行操作
export function rankReducer(preState: number[] = [], action: RankAction) {
    if (!action) return preState
    const { type, data } = action
    switch (type) {
        case RANK_OPTION.REPLACE:
            return data
        case RANK_OPTION.ADD:
            return preState ? preState.concat(data) : data
        case RANK_OPTION.CLEAR:
            return []
        default:
            return preState.concat([])
    }
}

//对选手进行操作
export function playerReducer(preState: Player[] = [], action: PlayerAction) {
    if (!action) return preState
    const { type, data } = action
    switch (type) {
        case PLAYER_OPTION.REPLACE:
            return data
        case PLAYER_OPTION.ADD:
            return preState ? preState.concat(data) : data
        case PLAYER_OPTION.CLEAR:
            return []
        default:
            return preState.concat([])
    }
}