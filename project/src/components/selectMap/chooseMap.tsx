/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import '@/style/selectMap/map.less'
import { MapItem } from '@/interfaces'
import { useSelector } from "react-redux";
import { Input, Button } from 'antd';
import TextArea from "antd/es/input/TextArea";

const ChooseMap: React.FC = forwardRef((props, ref) => {

    // 组件内参数与state
    // 先获取地图库
    const [originList] = useState<MapItem[]>(useSelector((state: { mapList: MapItem[] }) => state.mapList))
    const [unSelectedList, setUnselectedList] = useState<MapItem[]>(originList.map(item => item))
    // 储存已选中的地图
    const [selectedList, setSelectedList] = useState<MapItem[]>([])
    // 现在选中的地图
    const [currentMap, setCurrentMap] = useState<MapItem>({})


    useImperativeHandle(ref, () => ({
        stepOption: stepOption
    }))

    // 筛选出单张地图
    const chooseMapItem = () => {
        if (unSelectedList.length === 0) return
        const tempList = unSelectedList.map(item => item)
        const tempList2 = selectedList.map(item => item)
        const tempMap = tempList.splice(Math.floor(Math.random() * tempList.length), 1)[0]
        tempList2.push(tempMap)
        setSelectedList(tempList2)
        setUnselectedList(tempList)
        setCurrentMap(tempMap)
    }

    // 一键筛选
    const allChoose = () => {
        const tempList = originList.map(item => item)
        const tempList2 = []
        while (tempList.length) {
            const tempMap = tempList.splice(Math.floor(Math.random() * tempList.length), 1)[0]
            tempList2.push(tempMap)
        }
        setSelectedList(tempList2)
        setUnselectedList(tempList)
    }

    // 重置
    const reset = (cb?: () => void) => {
        setUnselectedList(originList.map(item => item))
        setSelectedList([])
        setCurrentMap({})
        cb && cb()
    }

    const stepOption = (cb?: () => void, method: number = 1) => {
        if (method === 1) {
            reset(cb)
        }
    }


    useEffect(() => {
        // reset()
    }, [])
    //导入模块
    return (
        <>
            <div className='main'>
                <h1 className="title">
                    随机筛选地图
                </h1>
                <div className="choose_option">
                    <Input size="large" className="map_show" disabled={true} value={currentMap.name} />
                    <Button className="button" onClick={chooseMapItem}>录入</Button>
                    <Button className="button button-show" type="primary" onClick={allChoose}>一键筛选</Button>
                </div>
                <TextArea className="choose_list" disabled={true} value={
                    selectedList.map(item => item.name).join('，')
                } />
            </div>
        </>
    )
})

export default ChooseMap