import React from "react";
import type { Color } from "antd/es/color-picker";
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
    score: number[],
    color: Color
}

export interface refMethod {
    stepOption: (cb?: () => void, method?: number) => void,
}