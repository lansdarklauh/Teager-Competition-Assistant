import React from "react";
export interface NavRouter {
    name: string,
    router: React.FC,
    link: string
}
export interface MapItem {
    name: string,
    type: string,
    theme: string,
    difficulty: number
}
export interface MapListItem {
    value: string,
    label: string
}