/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import '@/style/scoring/scoring.less'
import { useDispatch } from "react-redux";
import { InputNumber, Button, Modal, Tooltip } from 'antd';
import RankLi from "./rankLi";
import { replacePlayerAction, replaceRankAction } from "@/redux/scoring/mapLib/scoringAction";
import { OrderedListOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { confirm } = Modal;

const Diving = forwardRef((props: any, ref) => {

    const navigate = useNavigate()

    // 阶段数
    const [stage, setStage] = useState(8)
    const [rankList, setRankList] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [fresh, refresh] = useState(false)


    // 获取redux的dispatch
    const dispatch = useDispatch<any>()

    const changeStage = (value: number | null) => {
        if (isNaN(Number(value))) {
            setStage(0)
        }
        else {
            setStage(Number(value))
        }
    }

    // 设定对应阶段的分数
    const changeScore = (index: number, score: number) => {
        const tempList = rankList.map((item: number, i: number) => {
            if (i === index) return score
            else return item
        })
        setRankList(tempList)
    }

    // 生成对应的阶段表
    const generateStages = () => {
        const tempList = []
        for (let i = 0; i <= stage; i++) {
            tempList.push(0)
        }
        setRankList(tempList)
        refresh(!fresh)
    }

    useImperativeHandle(ref, () => ({
        stepOption: stepOption
    }))


    // 下一步
    const nextStep = (cb?: () => void) => {
        dispatch(replaceRankAction(rankList))
        cb && cb()
    }

    const stepOption = (cb?: () => void, method: number = 1) => {
        if (method === 1) {
            if (method === 1) {
                nextStep(cb)
            } else {
                // Reset(cb)
            }
        }
    }

    useEffect(() => {
        // 读取本地存储比赛数据
        const lastScoring = JSON.parse(localStorage.getItem('localDiving') || 'null')
        if (lastScoring) {
            confirm({
                title: '本地缓存提醒',
                content: '检测到本地保存上一场比赛的信息，是否继续使用该场比赛信息？',
                okText: '继续使用',
                cancelText: '清除并开始新的比赛',
                onOk() {
                    const { players, rank } = lastScoring
                    if (players && rank) {
                        dispatch(replaceRankAction(rank))
                        dispatch(replacePlayerAction(players))
                        props.setStep(3)
                    } else {
                        localStorage.removeItem('localDiving')
                    }
                },
                onCancel() {
                    localStorage.removeItem('localDiving')
                },
            });
        }
    }, [])

    // 显示远程排名模块
    const showRankOnline = () => {
        navigate('/showRankOnline', { replace: true })
    }

    useEffect(() => {
        // reset()
    }, [fresh])

    //确定阶段分数模块
    return (
        <>
            <div className='main'>
                <h1 className="title">
                    请输入各阶段分数
                    <Tooltip title="联机自动获取排名">
                        <Button className="rank_list" type="link" icon={<OrderedListOutlined />} onClick={showRankOnline} />
                    </Tooltip>
                </h1>
                <div className="diving_option">
                    <span className="diving_title">阶段个数：</span>
                    <InputNumber size="large" className="diving-num" min={0} max={10} defaultValue={Number(stage)} onChange={changeStage} />
                    <Button className="button button-generate" type="primary" onClick={generateStages}>生成</Button>
                </div>
                <ul className="enter_num">
                    {
                        (() => {
                            if (rankList.length === 0) return []
                            const list = rankList.map((item: number, index: number) => {
                                return (
                                    <RankLi key={index} index={index} score={item} changeScore={changeScore} />
                                )
                            })
                            const temp = list.splice(0, 1)[0]
                            list[list.length] = temp
                            return list
                        }
                        )()
                    }
                </ul>
            </div>
        </>
    )
})

export default Diving