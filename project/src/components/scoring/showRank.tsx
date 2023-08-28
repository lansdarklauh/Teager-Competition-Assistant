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
        tempArr.sort((a, b) => {
            const A = a.value.split('-')[0]
            const B = b.value.split('-')[0]
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
                                    <span style={{ color: temp[1], fontSize: '20px', fontWeight: 600 }}>{temp[0]}</span>
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