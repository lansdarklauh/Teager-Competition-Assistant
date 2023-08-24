import React from "react";
export interface NavRouter {
    name: string,
    router: React.FC,
    link: string
}

// 选图相关：地图库，地图池
export interface MapItem {
    name?: string,
    type?: string,
    theme?: string,
    difficulty?: number,
    code?: string
}
export interface MapListItem {
    value: string,
    label: string
}

// 计分相关：选手
export interface Player {
    name: string,
    score: number[]
}

export interface refMethod {
    stepOption: (cb?: () => void, method?: number) => void,
}