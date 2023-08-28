/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import '@/style/selectMap/map.less'
import { MapItem } from '@/interfaces'
import { useDispatch, useSelector } from "react-redux";
import { replaceListAction } from "@/redux/selectMap/mapList/mapListAction";
import { Transfer } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';
import { nanoid } from 'nanoid'

const SelectMapList = forwardRef((_props, ref) => {

    interface RecordType {
        key: string;
        title: string;
        description: string;
        chosen: boolean;
    }

    // 组件内参数与state
    // 先获取地图库
    const [originList] = useState<MapItem[]>(useSelector((state: { mapLib: MapItem[] }) => state.mapLib))

    const [mapLib] = useState<MapItem[]>(originList.map(item => item))

    const [mockData] = useState<RecordType[]>(mapLib.map((item: MapItem) => {
        return {
            ...mapLib,
            key: String(item.code) || String(nanoid()),
            title: item.name || '',
            description: item.theme || '',
            chosen: false
        }
    }));

    const dispatch = useDispatch<any>()

    const [targetKeys, setTargetKeys] = useState<string[]>([]);

    const replaceList = () => {
        const list = targetKeys.map(key => {
            return mapLib.find(item => {
                return item.code === key
            }) || {
                name: '',
                type: '',
                difficulty: -1,
                theme: '',
                code: nanoid()
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

    const nextStep = (cb?: () => void) => {
        if (targetKeys.length === 0) return
        confirmList()
        cb && cb()
    }

    const stepOption = (cb?: () => void, method: number = 1) => {
        if (method === 1) {
            nextStep(cb)
        } else {
            // Reset(cb)
        }
    }

    // const reset = (cb?: () => void) => {
    //     const temp = originList.map(item => item)
    //     setMapLib(temp)
    //     setMockData(temp.map((item: MapItem) => {
    //         return {
    //             ...mapLib,
    //             key: String(item.code) || String(nanoid()),
    //             title: item.name || '',
    //             description: item.theme || '',
    //             chosen: false
    //         }
    //     }))
    //     setTargetKeys([])
    //     cb && cb()
    // }

    useImperativeHandle(ref, () => ({
        stepOption: stepOption
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
                />
            </div>
        </>
    )
})

export default SelectMapList