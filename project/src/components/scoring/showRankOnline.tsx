/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import '@/style/scoring/scoring.less'
import { Table, Button, Input, Tooltip, message } from 'antd';


const { Column } = Table;

const ShowRankOnline: React.FC = () => {

    (window as any).jumpToShowRank()
    const [messageApi, contextHolder] = message.useMessage();

    const startServer = async () => {
        const flag = await (window as any).electronAPI.rankServer()
        setServer(flag === 'true')
        messageApi.success('服务器状态：' + (flag === 'true' ? '开启' : '关闭'))
    }

    (window as any).electronAPI?.getRank((value: any) => {
        if (value) setList(sortRank(value))
    })

    const sortRank = (rank: any) => {
        const tempList = rank
        const tempArr: any[] = []
        Object.keys(tempList).forEach(key => {
            tempArr.push({
                key: key,
                value: tempList[key]
            })
            delete tempList[key]
        })
        tempArr.sort((a, b) => {
            const A = a.value.split('?')[0]
            const B = b.value.split('?')[0]
            if ((!Number(B) && Number(A)) || (Number(A) > Number(B))) {
                return -1
            }
            else if ((Number(B) && !Number(A)) || (Number(A) < Number(B))) {
                return 1
            } else {
                return 0
            }
        })
        tempArr.forEach((item) => {
            tempList[item.key] = item.value
        })
        return tempList
    }

    const [list, setList] = useState([])
    const [fresh, refresh] = useState(false)
    const [width, setWidth] = useState<number>(0)
    const [tableWidth, setTableWidth] = useState<number | undefined>()
    const [server, setServer] = useState(false)

    const changeTableWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setWidth(Number(e.target.value) || 0)
        }
    }

    const changeWidth = () => {
        if (width === 0) {
            setTableWidth(undefined)
        } else {
            setTableWidth(width)
        }
        refresh(!fresh)
    }


    useEffect(() => {

    }, [fresh])

    //列表项模块
    return (
        <>
            {contextHolder}
            <Table pagination={false} dataSource={[list]} rowKey={Object.keys(list)[0] || ''}>
                {
                    Object.keys(list).map(key => {
                        return <Column key={key} title={key} dataIndex={key} render={
                            (text) => {
                                const temp = text.split('?')
                                return (
                                    <span style={{ color: temp[1], fontSize: '20px', fontWeight: 600, width: tableWidth, display: "inline-block" }}>{temp[0]}</span>
                                )
                            }
                        } />
                    })
                }
            </Table>
            <div style={{ marginTop: '20px' }}>
                <Tooltip title='0为自适应，若名字长度大于宽度则优先使用名字长度'>
                    <span style={{ fontSize: '24px', fontWeight: 600, color: '#36CFC9', marginBottom: '10px' }}>修改每列宽度</span>
                </Tooltip>
                <Input style={{ marginBottom: '10px' }} defaultValue={0} onChange={changeTableWidth} />
                <Button key="submit" type="primary" onClick={changeWidth}>修改</Button>
                <Button key="submit" type="primary" onClick={startServer} style={{ marginLeft: '10px' }}>{server ? '关闭服务器' : '开启服务器'}</Button>
            </div >
            <div style={{ marginTop: '20px' }}>
                <span style={{ fontSize: '24px', fontWeight: 600, color: '#36CFC9', marginBottom: '10px' }}>注意：服务器开启时默认运行在9527端口，而且出于安全考虑不会给出公网ip，所以需要配合内网穿透软件使用（推荐用Cpolar）</span>
            </div>
        </>
    )
}

export default ShowRankOnline