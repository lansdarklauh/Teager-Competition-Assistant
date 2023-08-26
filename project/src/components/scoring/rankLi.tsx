/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, {
    forwardRef, useEffect,
    useImperativeHandle
} from "react";
import '@/style/scoring/scoring.less'
import { InputNumber } from 'antd';

type RankListType = {
    index: number,
    score: number,
    changeScore: (index: number, score: number) => void
}

const RankLi: React.FC<RankListType> = forwardRef((props: RankListType, ref) => {

    useImperativeHandle(ref, () => ({

    }))

    const changeScore = (value: number | null) => {
        if (isNaN(Number(value))) {
            props.changeScore(props.index, 0)
        }
        else {
            props.changeScore(props.index, Number(value))
        }
    }

    useEffect(() => {
        // reset()
    }, [])

    //列表项模块
    return (
        <>
            <li className="rank">
                <span className="rank_title">{props.index === 0 ? '未完成：' : ('第' + props.index + '名：')}</span>
                <InputNumber size="large" className="rank_input" type="text" defaultValue={Number(props.score)} onChange={changeScore} />
            </li>
        </>
    )
})

export default RankLi