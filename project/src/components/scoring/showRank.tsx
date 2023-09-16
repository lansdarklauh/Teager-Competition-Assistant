/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import '@/style/scoring/scoring.less'
import { Table, Button, Input, Tooltip } from 'antd';

const { Column } = Table;

const ShowRank: React.FC = () => {

    const sortRank = () => {
        const tempList = JSON.parse(localStorage.getItem('Teager_Rank') || "{}")
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

    const [list, setList] = useState(sortRank())
    const [fresh, refresh] = useState(false)
    const [width, setWidth] = useState<number>(0)
    const [tableWidth, setTableWidth] = useState<number | undefined>()

    const update = () => {
        setList(sortRank())
        refresh(!fresh)
    }

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
            <Table pagination={false} dataSource={[list]} rowKey={Object.keys(list)[0] || ''}>
                {
                    Object.keys(list).map(key => {
                        return <Column key={key} title={key} dataIndex={key} render={
                            (text) => {
                                const temp = text.split('?')
                                return (
                                    <span onClick={update} style={{ color: temp[1], fontSize: '20px', fontWeight: 600, width: tableWidth, display: "inline-block" }}>{temp[0]}</span>
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
            </div >
        </>
    )
}

export default ShowRank