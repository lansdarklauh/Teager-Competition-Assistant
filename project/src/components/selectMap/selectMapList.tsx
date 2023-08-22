/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import '@/style/selectMap/map.less'
import { MapListItem, MapItem } from '@/interfaces'
import { useDispatch, useSelector } from "react-redux";
import { replaceListAction } from "@/redux/selectMap/mapList/mapListAction";
import { Transfer } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';

const SelectMapList: React.FC = forwardRef((props, ref) => {

    interface RecordType {
        key: string;
        title: string;
        description: string;
        chosen: boolean;
    }

    // 组件内参数与state
    // 先获取地图库
    const [mapLib] = useState<MapItem[]>(useSelector((state: { mapLib: MapItem[] }) => state.mapLib))

    const [mockData] = useState<RecordType[]>(mapLib.map((item: MapItem) => {
        return {
            ...mapLib,
            key: item.name,
            title: item.name,
            description: item.theme,
            chosen: false
        }

    }));

    const dispatch = useDispatch<any>()

    const [targetKeys, setTargetKeys] = useState<string[]>([]);

    const replaceList = () => {
        const list = targetKeys.map(key => {
            return mapLib.find(item => {
                return item.name === key
            }) || {
                name: '',
                type: '',
                difficulty: -1,
                theme: ''
            }
        }).filter(obj => obj.name)

        dispatch(replaceListAction(list))
    }

    const filterOption = (inputValue: string, option: RecordType) =>
        option.description.indexOf(inputValue) > -1;

    const handleChange = (newTargetKeys: string[]) => {
        setTargetKeys(newTargetKeys);
    };

    const handleSearch = (dir: TransferDirection, value: string) => {
        console.log('search:', dir, value);
    };


    const confirmList = () => {
        replaceList()
    }

    const nextStep = () => {
        confirmList()
    }

    useImperativeHandle(ref, () => ({
        nextStep
    }))

    useEffect(() => {

    }, [])
    //导入模块
    return (
        <>
            <div className='main'>
                <h1 className="title">
                    选择地图池
                </h1>
                <Transfer
                    className="transfer"
                    dataSource={mockData}
                    showSearch
                    filterOption={filterOption}
                    targetKeys={targetKeys}
                    onChange={handleChange}
                    onSearch={handleSearch}
                    listStyle={{
                        width: 320,
                        height: 320,
                    }}
                    render={(item) => item.title}
                    pagination
                />
            </div>
        </>
    )
})

export default SelectMapList