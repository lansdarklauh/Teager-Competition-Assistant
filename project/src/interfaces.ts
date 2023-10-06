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
export interface LocalLib {
    name: string,
    context: string
}

// 计分相关：选手
export interface Player {
    name: string,
    score: number[],
    color: Color | string,
    code: string
}

// 带有ref的接口
export interface refComponent {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: any
}

export interface refMethod {
    stepOption: (cb?: () => void, method?: number) => void,
}

export interface KeyList {
    up: number,
    down: number,
    left: number,
    right: number,
    shift: number,
    ctrl: number,
    alt: number,
    r: number
}