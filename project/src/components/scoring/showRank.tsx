/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import '@/style/scoring/scoring.less'
import { Table } from 'antd';

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
        tempArr.sort((a, b) => a.value - b.value)
        tempArr.forEach((item) => {
            tempList[item.key] = item.value
        })
        return tempList
    }

    const [list] = useState(sortRank())


    useEffect(() => {

    }, [])

    //列表项模块
    return (
        <>
            <Table pagination={false} dataSource={[list]}>
                {
                    Object.keys(list).map(key => {
                        return <Column key={key} title={key} dataIndex={key} render={
                            (text) => {
                                const temp = text.split('-')
                                return (
                                    <span style={{ color: temp[1] }}>{temp[0]}</span>
                                )
                            }
                        } />
                    })
                }
            </Table>
        </>
    )
}

export default ShowRank