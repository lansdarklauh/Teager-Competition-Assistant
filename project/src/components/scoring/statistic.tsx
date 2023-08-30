/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import '@/style/selectMap/map.less'
import { Player } from '@/interfaces'
import { useSelector } from "react-redux";
import { Table, Button, Modal, Select, Tag, Tooltip } from 'antd';
import {
    OrderedListOutlined,
    RedoOutlined
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
                player.score.push(rank[num + 1] || rank[0])
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
                    <Tooltip title="归零">
                        <Button className="rank_list" type="link" icon={<RedoOutlined />} onClick={refreshScore} />
                    </Tooltip>
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
                                return score.join('+')
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
            </div>
        </>
    )
})

export default Statistic