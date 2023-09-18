/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import '@/style/selectMap/map.less'
import { MapItem } from '@/interfaces'
import { useDispatch, useSelector } from "react-redux";
import { replaceListAction } from "@/redux/selectMap/mapList/mapListAction";
import { Transfer, Radio } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';
import { nanoid } from 'nanoid'
import type { RadioChangeEvent } from 'antd';

const SelectMapList = forwardRef((_props, ref) => {

    interface RecordType extends MapItem {
        key: string;
        title: string;
        description: string;
        chosen: boolean;
    }

    // 组件内参数与state
    // 先获取地图库
    const [originList] = useState<MapItem[]>(useSelector((state: { mapLib: MapItem[] }) => state.mapLib))

    const [mapLib] = useState<MapItem[]>(originList.map(item => item))

    const [mockData, setMockData] = useState<RecordType[]>(mapLib.map((item: MapItem) => {
        return {
            ...item,
            key: String(item.code) || String(nanoid()),
            title: item.name || '',
            description: item.theme || '',
            chosen: false
        }
    }));

    const dispatch = useDispatch<any>()

    const [targetKeys, setTargetKeys] = useState<string[]>([]);

    // 分类选项
    const [classify, setClassify] = useState<string>('')

    const [fresh, refresh] = useState(false)

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
        option.title.indexOf(inputValue) > -1;

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

    const changeClassify = (e: RadioChangeEvent) => {
        setClassify(e.target.value);
        let tempData = []
        switch (e.target.value) {
            case '':
                setMockData(mapLib.map((item: MapItem) => {
                    return {
                        ...item,
                        key: String(item.code) || String(nanoid()),
                        title: item.name || '',
                        description: item.theme || '',
                        chosen: false
                    }
                }))
                break;
            case 'difficulty':
                tempData = mockData.map(item => item)
                tempData.sort((a: RecordType, b: RecordType) => {
                    return (a.difficulty || 0) - (b.difficulty || 0)
                })
                setMockData(tempData)
                break;
            case 'type':
                tempData = mockData.map(item => item)
                tempData.sort((a: RecordType, b: RecordType) => {
                    return String(a.type || '').localeCompare(String(b.type || ''))
                })
                setMockData(tempData)
                break;
            case 'theme':
                tempData = mockData.map(item => item)
                tempData.sort((a: RecordType, b: RecordType) => {
                    return String(a.theme || '').localeCompare(String(b.theme || ''))
                })
                setMockData(tempData)
                break
            default:
                setMockData(mapLib.map((item: MapItem) => {
                    return {
                        ...item,
                        key: String(item.code) || String(nanoid()),
                        title: item.name || '',
                        description: item.theme || '',
                        chosen: false
                    }
                }))
                break;
        }
        refresh(!fresh)
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

    }, [fresh])
    //导入模块
    return (
        <>
            <div className='main'>
                <h1 className="title">
                    选择地图池
                </h1>
                <Radio.Group onChange={changeClassify} value={classify}>
                    <Radio value={''}>无</Radio>
                    <Radio value={'difficulty'}>难度</Radio>
                    <Radio value={'theme'}>主题</Radio>
                    <Radio value={'type'}>类型</Radio>
                </Radio.Group>
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
                    render={(item) => {
                        switch (classify) {
                            case '':
                                return item.name + ' | ' + item.type + ' | ' + item.difficulty + '星'
                            case 'difficulty':
                                return item.difficulty + '星' + ' | ' + item.name + ' | ' + item.type
                            case 'theme':
                                return item.name + ' | ' + item.type + ' | ' + item.difficulty + '星'
                            case 'type':
                                return item.type + ' | ' + item.name + ' | ' + item.difficulty + '星'
                            default:
                                return item.name + ' | ' + item.type + ' | ' + item.difficulty + '星'
                        }
                    }}
                />
            </div>
        </>
    )
})

export default SelectMapList