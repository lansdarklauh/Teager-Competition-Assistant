import { PLAYER_OPTION, RANK_OPTION } from "../const";
import { Player } from "@/interfaces";

//选手相关的action
export const addPlayerAction = (data: Player[] = []) => ({ type: PLAYER_OPTION.ADD, data })
export const replacePlayerAction = (data: Player[] = []) => ({ type: PLAYER_OPTION.REPLACE, data })
export const clearPlayerAction = (data: Player[] = []) => ({ type: PLAYER_OPTION.CLEAR, data })

//选手相关的action
export const addRankAction = (data: number[] = []) => ({ type: RANK_OPTION.ADD, data })
export const replaceRankAction = (data: number[] = []) => ({ type: RANK_OPTION.REPLACE, data })
export const clearRankAction = (data: number[] = []) => ({ type: RANK_OPTION.CLEAR, data })