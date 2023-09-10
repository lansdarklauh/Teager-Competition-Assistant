/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import '@/style/selectMap/map.less'
import { Player } from '@/interfaces'
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, ColorPicker, Modal } from 'antd';
import type { Color } from 'antd/es/color-picker';
import { replacePlayerAction } from "@/redux/scoring/mapLib/scoringAction";
import { nanoid } from "nanoid";

const EnterPlayer = forwardRef((_props, ref) => {

    // 组件内参数与state
    const [players, setPlayers] = useState<Player[]>(useSelector((state: { players: Player[] }) => state.players))
    const [player, setPlayer] = useState<string>('')

    // 设置颜色
    const [color, setColor] = useState<Color | string>('#36CFC9');
    const [open, setOpen] = useState(false)
    const [reColor, setReColor] = useState<Color | string>('#36CFC9');
    const [currentPlayer, setCurrentPlayer] = useState<Player>({
        name: '',
        score: [],
        color: '',
        code: ''
    });
    const [currentName, setCurrentName] = useState<string>()
    const [fresh, refresh] = useState(false)

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
        refresh(!fresh)
    }

    // 重置
    const reset = () => {
        setPlayers([])
        setColor('#36CFC9')
        refresh(!fresh)

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

    // 点击选手名称后弹出修改框
    const selectCurrentPlayer = (player: Player) => {
        setReColor(player.color)
        setCurrentPlayer(player)
        setCurrentName(player.name)
        setOpen(true)
    }

    const inputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setCurrentName(e.target.value)
        }
    }

    const cancelChange = () => {
        setReColor('')
        setCurrentPlayer({
            name: '',
            score: [],
            color: '',
            code: ''
        })
        setCurrentName('')
        setOpen(false)
    }

    // 确定后更新选手
    const confirmChange = () => {
        const tempPlayer = {
            name: currentName || currentPlayer.name,
            score: currentPlayer.score,
            color: reColor || currentPlayer.color,
            code: currentPlayer.code
        }
        const tempList = players.map(item => {
            if (item.code === tempPlayer.code) return tempPlayer
            else return item
        })
        setPlayers(tempList)
        setOpen(false)
        refresh(!fresh)
    }

    // 删除当前选手
    const deletePlayer = () => {
        const tempList: Player[] = []
        players.forEach(item => {
            if (item.code !== currentPlayer.code) tempList.push(item)
        })
        setPlayers(tempList)
        setOpen(false)
        refresh(!fresh)
    }


    useEffect(() => {
        // reset()
    }, [fresh])
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
                                <span key={item.code} style={{ color: typeof item.color === 'string' ? item.color : item.color.toHexString() }} onClick={() => { selectCurrentPlayer(item) }}>
                                    {item.name + (index === players.length - 1 ? '' : '，')}
                                </span>
                            )
                        })
                    }
                </div>
                <Modal
                    open={open}
                    title="请修改选手名字"
                    centered
                    onCancel={cancelChange}
                    footer={[
                        <Button className='button button-delete' key="back" onClick={deletePlayer}>
                            删除
                        </Button>,
                        <Button className='button' key="back" onClick={cancelChange}>
                            取消
                        </Button>,
                        <Button className='button button-generate' key="submit" type="primary" onClick={confirmChange}>
                            确定
                        </Button>,
                    ]}
                    destroyOnClose={true}
                    maskClosable={false}
                >
                    <div className="diving_option">
                        <Input size="large" className="change-name" defaultValue={currentName} onChange={inputNameChange} />
                        <ColorPicker className="button" defaultValue={reColor} onChange={setReColor} presets={[{
                            label: '预设颜色',
                            colors: [
                                'yellow', 'black', 'red', 'DarkViolet', 'gray', 'green', 'DodgerBlue', 'DeepPink', 'orange', 'Cyan'
                            ]
                        }]} />
                    </div>
                </Modal>
            </div>
        </>
    )
})

export default EnterPlayer