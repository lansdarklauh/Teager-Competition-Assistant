/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import '@/style/selectMap/map.less'
import { Player } from '@/interfaces'
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, ColorPicker } from 'antd';
import type { Color } from 'antd/es/color-picker';
import { replacePlayerAction } from "@/redux/scoring/mapLib/scoringAction";
import { nanoid } from "nanoid";

const EnterPlayer = forwardRef((_props, ref) => {

    // 组件内参数与state
    const [players, setPlayers] = useState<Player[]>(useSelector((state: { players: Player[] }) => state.players))
    const [player, setPlayer] = useState<string>()

    // 设置颜色
    const [color, setColor] = useState<Color | string>('#36CFC9');

    // 获取redux的dispatch
    const dispatch = useDispatch<any>()


    useImperativeHandle(ref, () => ({
        stepOption: stepOption
    }))

    const inputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setPlayer(e.target.value)
        }
    }

    // 录入单个选手
    const chooseMapItem = () => {
        if (!player) return
        const tempList = players.map(item => item)
        tempList.push({
            name: player,
            score: [],
            color: typeof color === 'string' ? color : color.toHexString(),
            code: nanoid()
        })
        setPlayers(tempList)
        setPlayer('')
    }

    // 重置
    const reset = () => {
        setPlayer('')
        setPlayers([])
        setColor('#36CFC9')

    }

    const toNextStep = (cb?: () => void) => {
        if (players.length === 0) return
        dispatch(replacePlayerAction(players))
        cb && cb()
    }

    const stepOption = (cb?: () => void, method: number = 1) => {
        if (method === 1) {
            toNextStep(cb)
        }
    }


    useEffect(() => {
        // reset()
    }, [])
    //导入模块
    return (
        <>
            <div className='main'>
                <h1 className="title">
                    请输入选手名称
                </h1>
                <div className="diving_option">
                    <Input size="large" className="diving-num" defaultValue={player} onChange={inputChanged} />
                    <ColorPicker className="button" value={color} onChange={setColor} presets={[{
                        label: '预设颜色',
                        colors: [
                            'yellow', 'black', 'red', 'DarkViolet', 'gray', 'green', 'DodgerBlue', 'DeepPink', 'orange', 'Cyan'
                        ]
                    }]} />
                    <Button className="button button-generate" type="primary" onClick={chooseMapItem}>录入</Button>
                    <Button className="button" onClick={reset}>重置</Button>
                </div>
                <div className="enter_num">
                    {
                        players.map((item, index) => {
                            return (
                                <span key={item.code} style={{ color: typeof item.color === 'string' ? item.color : item.color.toHexString() }}>
                                    {item.name + (index === players.length - 1 ? '' : '，')}
                                </span>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
})

export default EnterPlayer