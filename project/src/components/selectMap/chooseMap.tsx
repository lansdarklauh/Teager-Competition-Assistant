/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import '@/style/selectMap/map.less'
import { MapItem } from '@/interfaces'
import { useSelector } from "react-redux";
import {
    // Input,
    Select, Button
} from 'antd';
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

const ChooseMap = forwardRef((_props, ref) => {

    // 组件内参数与state
    // 先获取地图库
    const [originList] = useState<MapItem[]>(useSelector((state: { mapList: MapItem[] }) => state.mapList))
    const [unSelectedList, setUnselectedList] = useState<MapItem[]>(originList.map(item => item))
    // 储存已选中的地图
    const [selectedList, setSelectedList] = useState<MapItem[]>([])
    // 现在选中的地图
    const [currentMap, setCurrentMap] = useState<string>('')
    // 手动输入的地图
    const [ManualMap, setManualMap] = useState<string>('')
    const [fresh, refresh] = useState(false)


    useImperativeHandle(ref, () => ({
        stepOption: stepOption
    }))

    // 筛选出单张地图
    const chooseMapItem = () => {
        if (unSelectedList.length === 0) return
        const tempList = unSelectedList.map(item => item)
        const tempList2 = selectedList.map(item => item)
        let tempMap = {}
        if (Object.keys(ManualMap).length !== 0) {
            for (let i = 0; i < tempList.length; i++) {
                if (tempList[i].code === ManualMap) {
                    tempMap = tempList.splice(i, 1)[0]
                }
            }
        } else {
            tempMap = tempList.splice(Math.floor(Math.random() * tempList.length), 1)[0]
        }
        tempList2.push(tempMap)
        setSelectedList(tempList2)
        setUnselectedList(tempList)
        setCurrentMap('')
        setManualMap('')
        refresh(!fresh)
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
        setCurrentMap('')
        setManualMap('')
    }

    // 重置
    const reset = (cb?: () => void) => {
        setUnselectedList(originList.map(item => item))
        setSelectedList([])
        setCurrentMap('')
        cb && cb()
    }

    // 手动选择地图
    const selectedChange = (value: string) => {
        setManualMap(value)
        setCurrentMap(value)
    }

    const stepOption = (cb?: () => void, method: number = 1) => {
        if (method === 1) {
            reset(cb)
        }
    }


    useEffect(() => {
        // reset()
    }, [fresh])
    //导入模块
    return (
        <>
            <div className='main'>
                <h1 className="title">
                    随机筛选地图
                </h1>
                <div className="choose_option">
                    {/* <Input size="large" className="map_show" disabled={true} value={currentMap.name} onChange={ } /> */}
                    <Select
                        value={currentMap}
                        className="map_show"
                        onChange={selectedChange}
                        disabled={unSelectedList.length === 0}
                    >
                        {
                            unSelectedList.map(item => {
                                return (
                                    <Option key={item.code} value={item.code} label={item.name} map={item}>
                                        <span>{item.name}</span>
                                    </Option>
                                )
                            })
                        }
                    </Select>
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