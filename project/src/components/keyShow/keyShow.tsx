/* eslint-disable no-unexpected-multiline */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { Modal } from 'antd';
import Happy from "@/assets/happy.png";
import '@/style/keyShow/keyShow.less'
import { KeyList } from "@/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { addListAction } from "@/redux/keyShow/keyList/keyListAction";

const KeyShow: React.FC = () => {
    //
    // const [up, setUp] = useState(38)
    // const [down, setDown] = useState(40)
    // const [left, setLeft] = useState(37)
    // const [right, setRight] = useState(39)
    // const [shift] = useState(160)
    // const [ctrl] = useState(162)
    // const [alt] = useState(164)
    // const [r, setR] = useState(82)
    const [keyList, setKeyList] = useState<KeyList>(useSelector((state: { keyList: KeyList }) => state.keyList))
    console.log(useSelector((state: { keyList: KeyList }) => state.keyList))
    const [dialog] = useState(false)
    const [init, setInit] = useState(false)

    // 获取redux的dispatch
    const dispatch = useDispatch<any>()

    const initKeys = () => {
        if (keyList && Object.keys(keyList)) return
        const obj = {
            up: 38,
            down: 40,
            left: 37,
            right: 39,
            shift: 160,
            ctrl: 162,
            alt: 164,
            r: 82
        }
        dispatch(addListAction(obj))
        setKeyList(obj)
    }

    const addEventListener = () => {
        (window as any).electronAPI.initGlobalKey()
    }

    const getEvent = () => {
        (window as any).electronAPI.getEventChange((_event: any, value: any) => {
            // console.log(_event, value)
            const { event, type } = value
            if (event) {
                const tempList = [keyList.up, keyList.down, keyList.left, keyList.right, keyList.shift, keyList.ctrl, keyList.alt, keyList.r]
                if (tempList.includes(event.rawcode)) {
                    let dom: HTMLElement | null = null
                    switch (event.rawcode) {
                        case keyList.up:
                            dom = document.getElementById('up')
                            break;
                        case keyList.down:
                            dom = document.getElementById('down')
                            break;
                        case keyList.left:
                            dom = document.getElementById('left')
                            break;
                        case keyList.right:
                            dom = document.getElementById('right')
                            break;
                        case keyList.shift:
                            dom = document.getElementById('shift')
                            break;
                        case keyList.ctrl:
                            dom = document.getElementById('ctrl')
                            break;
                        case keyList.alt:
                            dom = document.getElementById('alt')
                            break;
                        case keyList.r:
                            dom = document.getElementById('r')
                            break;
                        default:
                            break;
                    }
                    if (dom) {
                        if (type === 'keydown') {
                            dom.style.color = '#ffffff'
                            dom.style.backgroundColor = '#36CFC9'
                        } else if (type === 'keyup') {
                            dom.style.color = ''
                            dom.style.backgroundColor = ''
                        }
                    }
                }
                // console.log(event)
            }
        })
    }

    // const setNewKey = (key: string) => {
    //     setDialog(true)
    //     const changeKey = (e: any) => {
    //         window.removeEventListener('keyup', changeKey)
    //         setDialog(false)
    //         const obj = JSON.parse(JSON.stringify(keyList))
    //         obj[key] = e.keyCode
    //         dispatch(replaceListAction(obj))
    //         setKeyList(obj)
    //     }
    //     window.addEventListener('keyup', changeKey)
    // }

    useEffect(() => {
        initKeys()
        if (init) return
        addEventListener()
        getEvent()
        setInit(true)
    }, [])

    //选图模块
    return (
        <div className='map-main'>
            <div className="main">
                <h1 className="title">
                    指法显示器
                </h1>
                <div className="keyshow-box">
                    <div id="shift" className={['key', 'key-shift'].join(' ')}>Shift</div>
                    <div id="r" className={['key', 'key-r'].join(' ')}>R</div>
                    <div id="up" className={['key', 'key-up'].join(' ')}>↑</div>
                    <div id="ctrl" className={['key', 'key-direction'].join(' ')}>Ctrl</div>
                    <div id="alt" className={['key', 'key-direction'].join(' ')}>Alt</div>
                    <div id="left" className={['key', 'key-direction'].join(' ')}>←</div>
                    <div id="down" className={['key', 'key-direction'].join(' ')}>↓</div>
                    <div id="right" className={['key', 'key-direction'].join(' ')}>→</div>
                </div>

            </div>
            <img className="map-confused" src={Happy} alt="开心" />
            <Modal
                open={dialog}
                title="请点击想要设置的按键"
                centered
                destroyOnClose={true}
                maskClosable={false}
            >
            </Modal>
        </div>
    )
}
export default KeyShow