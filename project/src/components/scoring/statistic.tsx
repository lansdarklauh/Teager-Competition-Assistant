/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import '@/style/selectMap/map.less'
import { Player } from '@/interfaces'
import { useSelector } from "react-redux";
import { Table, Button, Modal, Select, Tag, Tooltip, Popconfirm, Input } from 'antd';
import {
    OrderedListOutlined,
    RedoOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

const { Column } = Table;
const { Option } = Select;

const Statistic = forwardRef((_props, ref) => {

    // 组件内参数与state
    const [players, setPlayers] = useState<Player[]>(useSelector((state: { players: Player[] }) => state.players))
    const [rank] = useState<number[]>(useSelector((state: { rank: number[] }) => state.rank))
    const [fresh, refresh] = useState(false)
    const [selectedPlayers, setSelectedPlayers] = useState<string[]>([])
    const [open, setOpen] = useState(false)

    // 修改分数
    const [selectPlayer, setSelectedPlayer] = useState<Player>({
        name: '',
        score: [],
        color: '',
        code: ''
    })
    const [openChange, setOpenChange] = useState(false)
    const [currentScore, setCurrentScore] = useState<number[]>([])


    useImperativeHandle(ref, () => ({
        stepOption: stepOption
    }))

    const stepOption = (cb?: () => void, method: number = 1) => {
        if (method === 1) {
            addNewRank()
        }
        cb && cb()
    }

    // 储存数据到localStorage
    const storeLocal = (name: string, data: any) => {
        localStorage.setItem(name, data)
    }

    // 渲染标签颜色
    const tagRender = (props: CustomTagProps) => {
        const { label, closable, onClose } = props;
        const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                // color={typeof selected.color === 'string' ? selected.color : selected.color.toHexString()}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{ marginRight: 3 }}
            >
                {label}
            </Tag>
        );
    };

    const selectedChange = (value: any) => {
        setSelectedPlayers(value)
    }

    // 打开排名添加窗口
    const addNewRank = () => {
        setOpen(true)
    }

    // 确定此轮排名
    const confirmSelected = () => {
        if (selectedPlayers.length === 0) return cancelSelected()
        const tempSelected = selectedPlayers.map(item => item)
        const newScoring = players.map(player => player)
        newScoring.forEach(player => {
            const num = tempSelected.indexOf(player.code)
            if (num === -1) {
                player.score.push(rank[0])
            } else {
                player.score.push((rank[num + 1] || rank[num + 1] === 0) ? rank[num + 1] : rank[0])
            }
        })
        setPlayers(newScoring)
        setSelectedPlayers([])
        setOpen(false)
        // refresh(!fresh)
    }

    // 取消此次排名
    const cancelSelected = () => {
        setSelectedPlayers([])
        setOpen(false)
        refresh(!fresh)
    }

    // 计算总分
    const getTotal = (score: number[]) => {
        if (score.length === 0) return 0
        let total = 0
        score.forEach((li) => {
            total += Number(li) || 0
        })
        return total
    }

    // 显示排名窗口方便捕获
    const showRankHandle = () => {
        // 作为本地地址录入时需要用pathname+#/hash
        window.open(location.pathname + '#/showRank', "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=800, height=400")
    }

    // 重置分数
    const refreshScore = () => {
        setPlayers(players.map(item => {
            item.score = []
            return item
        }))
    }

    // 撤销上一局分数
    const undoLastMatch = () => {
        const tempList = players.map(item => {
            const obj = {
                ...item
            }
            if (obj.score.length > 0) {
                obj.score.splice(obj.score.length - 1)
            }
            return obj
        })
        setPlayers(tempList)
        refresh(!fresh)
    }

    // 分数按逗号隔开后转为数字储存
    const inputScoreChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const tempArr = e.target.value.split(/[,，]/)
            setCurrentScore(tempArr.map(item => {
                return Number(item) || 0
            }))
        }
    }

    const cancelChange = () => {
        setOpenChange(false)
        refresh(!fresh)
    }

    const confirmChange = () => {
        const tempPlayer: Player = {
            name: selectPlayer.name || '',
            score: currentScore.length ? currentScore : selectPlayer.score,
            color: selectPlayer.color,
            code: selectPlayer.code
        }
        const tempPlayers = players.map(item => {
            if (tempPlayer.code === item.code) return tempPlayer
            else return item
        })
        setPlayers(tempPlayers)
        setOpenChange(false)
        refresh(!fresh)
    }


    useEffect(() => {
        // reset()
        const temp: any = {}
        players.forEach(item => {
            temp[item.name] = getTotal(item.score) + '?' + item.color
        })
        storeLocal('Teager_Rank', JSON.stringify(temp))
    }, [players, fresh])
    //导入模块
    return (
        <>
            <div className='main'>
                <h1 className="title">
                    选手计分排名
                    <Tooltip title="排名窗口">
                        <Button className="rank_list" type="link" icon={<OrderedListOutlined />} onClick={showRankHandle} />
                    </Tooltip>
                    <Popconfirm
                        title="分数归零"
                        description="确定撤销上一局的比赛结果吗？"
                        onConfirm={undoLastMatch}
                        onCancel={() => { }}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Tooltip title="撤销上一局">
                            <Button className="rank_list" type="link" icon={<ArrowLeftOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                    <Popconfirm
                        title="分数归零"
                        description="确定将所有选手的分数清零吗？"
                        onConfirm={refreshScore}
                        onCancel={() => { }}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Tooltip title="归零">
                            <Button className="rank_list" type="link" icon={<RedoOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                </h1>
                <div className="enter_num">
                    <Table rowKey="code" dataSource={players} pagination={false} scroll={{ y: 240 }} >
                        <Column title="选手" dataIndex="name" key="name" render={
                            (name: string, data: Player) => {
                                return (<span style={{ color: typeof data.color === 'string' ? data.color : data.color.toHexString() }}>{name}</span>)
                            }
                        } />
                        <Column title="具体分数" dataIndex="score" key="score" render={
                            (score: number[]) => {
                                if (score.length === 0) return 0
                                return (
                                    <span style={{ cursor: "pointer" }}>
                                        {score.join('+')}
                                    </span>
                                )
                            }
                        }
                            onCell={
                                (record: Player | undefined) => {
                                    return {
                                        onClick: () => {
                                            if (!record) return
                                            setSelectedPlayer(record)
                                            if (record.score) setCurrentScore(record.score)
                                            setOpenChange(true)
                                        }
                                    }
                                }
                            } />
                        <Column title="总分" dataIndex="score" key="score" render={
                            (score: number[]) => {
                                const total = getTotal(score)
                                return (
                                    <span>{total}</span>
                                )
                            }
                        }
                            sorter={(a: Player, b: Player) => {
                                return getTotal(a.score) - getTotal(b.score)
                            }}
                            defaultSortOrder='descend' />

                    </Table>
                </div>
                <Modal
                    open={open}
                    title="请依名次点击选手名字，未点统一为第0名"
                    centered
                    onOk={confirmSelected}
                    onCancel={cancelSelected}
                    footer={[
                        <Button className='button' key="back" onClick={cancelSelected}>
                            取消
                        </Button>,
                        <Button className='button button-generate' key="submit" type="primary" onClick={confirmSelected}>
                            确定
                        </Button>,
                    ]}
                    destroyOnClose={true}
                    maskClosable={false}
                >
                    <Select
                        mode="multiple"
                        tagRender={tagRender}
                        defaultValue={[]}
                        style={{ width: '60%' }}
                        onChange={selectedChange}
                    >
                        {
                            players.map(player => {
                                return (
                                    <Option key={player.code} value={player.code} label={player.name} player={player}>
                                        <span style={{ color: typeof player.color === 'string' ? player.color : player.color.toHexString() }}>{player.name}</span>
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Modal>
                <Modal
                    open={openChange}
                    title="请修改选手具体场次分数，用逗号隔开"
                    centered
                    onOk={confirmChange}
                    onCancel={cancelChange}
                    footer={[
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
                    <Input size="large" className="diving-num" defaultValue={currentScore.join(',')} onChange={inputScoreChanged} />
                </Modal>
            </div>
        </>
    )
})

export default Statistic