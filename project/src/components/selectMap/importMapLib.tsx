/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload, Select } from 'antd'
import '@/style/selectMap/map.less'
// import { Select } from 'antd';
// import popkart_all from "/popkart_all.json?url";
// import axios from "axios";
import { MapItem, MapListItem, LocalLib } from '@/interfaces'
import { useDispatch } from "react-redux";
import { replaceLibAction } from "@/redux/selectMap/mapLib/mapLibAction";
import { nanoid } from 'nanoid'

const ImportMapLib = forwardRef((_props, ref) => {
    // 组件内参数与state
    const { Dragger } = Upload;
    const [mapLibLocal, setMapLibLocal] = useState<MapListItem[]>([])
    const [mapLib, setMapLib] = useState<MapItem[]>([])

    const dispatch = useDispatch<any>()

    // const Reset = (cb?: () => void) => {
    //     getDefaultMap(popkart_all)
    //     setMapLib([])
    //     cb && cb()
    // }

    const replaceLib = () => {
        dispatch(replaceLibAction(mapLib))
    }

    //这里需要用any类型，因为antd没有暴露options的接口
    const handleUpload = (options: any) => {
        const { onSuccess, file } = options
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = () => {
            const mapList = reader.result !== null && typeof reader.result === 'string' ? reader.result.split('\r\n') : []
            if (mapList.length !== 0) {
                setMapLib(mapList.map((item) => {
                    const arr = item.split('-')
                    if (arr.length === 0 || arr.length === 1) {
                        return {
                            name: item,
                            difficulty: 0,
                            type: '竞速',
                            theme: '未知',
                            code: nanoid()
                        }
                    } else {
                        return {
                            name: arr[0] || '',
                            difficulty: !isNaN(Number(arr[1])) ? Number(arr[1]) || 0 : 0,
                            type: arr[2] || '竞速',
                            theme: arr[3] || '未知',
                            code: nanoid()
                        }
                    }

                }).filter(obj => obj.name !== ''))
            }
        }
        reader.onerror = (err) => {
            message.error(`${file.name} 上传失败: ${err}`);
        }
        onSuccess()
    }

    //使用customRequest跳过请求
    const uploadProps: UploadProps = {
        name: 'file',
        action: '',
        multiple: false,
        maxCount: 1,
        className: 'drag',
        customRequest: handleUpload,
        onChange(info) {
            const { status } = info.file;
            if (status === 'done') {
                message.success(`${info.file.name} 上传成功.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} 上传失败.`);
            }
        },
        onDrop() {
            // console.log('Dropped files', e.dataTransfer.files);
        },
        onRemove() {
            setMapLib([])
        }
    };

    const handleChange = (value: string) => {
        setMapLib(JSON.parse(value))
    };

    // const getDefaultMap = async (url: string) => {
    //     const res = await axios.get(url)
    //     const obj = [{
    //         value: JSON.stringify(res.data),
    //         label: popkart_all.slice(1)
    //     }]
    //     setMapList(() => obj)
    // }

    const confirmLib = () => {
        replaceLib()
    }

    const nextStep = (cb?: () => void) => {
        confirmLib()
        cb && cb()
    }

    const stepOption = (cb?: () => void, method: number = 1) => {
        if (method === 1) {
            nextStep(cb)
        } else {
            // Reset(cb)
        }
    }

    const getLocalMap = async () => {
        const mapLibsArr = await (window as any).electronAPI.readLocalMaps()
        // console.log(mapLibsArr)
        const localLibs: MapListItem[] = []
        mapLibsArr.forEach((lib: LocalLib) => {
            const mapListTemp = lib.context !== null && typeof lib.context === 'string' ? lib.context.split('\r\n') : []
            if (mapListTemp.length !== 0) {
                localLibs.push({
                    label: lib.name,
                    value: JSON.stringify(
                        mapListTemp.map((item: string) => {
                            const arr = item.split('-')
                            if (arr.length === 0 || arr.length === 1) {
                                return {
                                    name: item,
                                    difficulty: 0,
                                    type: '竞速',
                                    theme: '未知',
                                    code: nanoid()
                                }
                            } else {
                                return {
                                    name: arr[0] || '',
                                    difficulty: !isNaN(Number(arr[1])) ? Number(arr[1]) || 0 : 0,
                                    type: arr[2] || '竞速',
                                    theme: arr[3] || '未知',
                                    code: nanoid()
                                }
                            }

                        }).filter(obj => obj.name !== '')
                    )
                })
            }
        })
        // console.log(localLibs)
        setMapLibLocal(localLibs)
    }

    useImperativeHandle(ref, () => ({
        stepOption: stepOption
    }))

    useEffect(() => {
        getLocalMap()
    }, [])
    //导入模块
    return (
        <>
            <div className='main'>
                <h1 className="title">
                    导入地图库
                </h1>
                <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">点击上传或拖拽文件到这里</p>
                    <p className="ant-upload-hint">
                        只允许上传TXT格式文件，文件中放入所有地图名称，用逗号或回车隔开
                    </p>
                </Dragger>
                <h1 className="title">
                    或选择地图库
                </h1>
                <p className="tip">
                    请将地图库文件（txt格式）放入“我的文档/KartriderToolMapLib”
                </p>
                <Select
                    className="select"
                    onChange={handleChange}
                    options={mapLibLocal}
                />

            </div>
        </>
    )
})

export default ImportMapLib