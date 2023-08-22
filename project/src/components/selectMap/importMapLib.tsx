/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd'
import '@/style/selectMap/map.less'
import { Select } from 'antd';
import popkart_all from "/popkart_all.json?url";
import axios from "axios";
import { MapListItem, MapItem } from '@/interfaces'
import { useDispatch } from "react-redux";
import { replaceLibAction } from "@/redux/selectMap/mapLib/mapLibAction";

const ImportMapLib: React.FC = forwardRef((props, ref) => {
    // 组件内参数与state
    const { Dragger } = Upload;
    const [mapList, setMapList] = useState<MapListItem[]>([{
        value: 'bbbbbb',
        label: 'aaaaaa'
    }])
    const [mapLib, setMapLib] = useState<MapItem[]>([])

    const dispatch = useDispatch<any>()

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
                    return {
                        name: item,
                        difficulty: 0,
                        type: '竞速',
                        theme: '未知'
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
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const handleChange = (value: string) => {
        setMapLib(JSON.parse(value))
    };

    const getDefaultMap = async (url: string) => {
        const res = await axios.get(url)
        const obj = [{
            value: JSON.stringify(res.data),
            label: popkart_all.slice(1)
        }]
        setMapList(() => obj)
    }

    const confirmLib = () => {
        replaceLib()
    }

    const nextStep = () => {
        confirmLib()
    }

    useImperativeHandle(ref, () => ({
        nextStep
    }))

    useEffect(() => {
        getDefaultMap(popkart_all)
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
                <Select
                    className="select"
                    onChange={handleChange}
                    options={mapList}
                />

            </div>
        </>
    )
})

export default ImportMapLib