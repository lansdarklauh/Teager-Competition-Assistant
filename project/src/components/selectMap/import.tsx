import React, { useEffect, useState } from "react";
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd'
import '@/style/selectMap/import.less'
import { Select } from 'antd';
import popkart_all from "/popkart_all.json?url";
import axios from "axios";
import { MapListItem, MapItem } from '@/interfaces'

const Import: React.FC = () => {
    const { Dragger } = Upload;
    const [mapList, setMapList] = useState<MapListItem[]>([{
        value: 'bbbbbb',
        label: 'aaaaaa'
    }])
    const [mapLib, setMapLib] = useState<MapItem[]>([])

    /* eslint-disable @typescript-eslint/no-explicit-any */
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
                }))
            }
        }
        reader.onerror = (err) => {
            message.error(`${file.name} 上传失败: ${err}`);
        }
        onSuccess()
    }

    //使用customRequest跳过请求
    const props: UploadProps = {
        name: 'file',
        action: '',
        multiple: false,
        maxCount: 1,
        className: 'import-drag',
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

    useEffect(() => {
        getDefaultMap(popkart_all)
    }, [])
    //导入模块
    return (
        <>
            <div className='import-main'>
                <h1 className="import-title">
                    导入地图库
                </h1>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">点击上传或拖拽文件到这里</p>
                    <p className="ant-upload-hint">
                        只允许上传TXT格式文件，文件中放入所有地图名称，用逗号或回车隔开
                    </p>
                </Dragger>
                <h1 className="import-title">
                    或选择地图库
                </h1>
                <Select
                    className="import-select"
                    onChange={handleChange}
                    options={mapList}
                />

            </div>
        </>
    )
}
export default Import