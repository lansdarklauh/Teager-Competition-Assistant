/* eslint-disable no-unexpected-multiline */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { Modal } from 'antd';
import Happy from "@/assets/happy.png";
import '@/style/keyShow/keyShow.less'

const KeyShow: React.FC = () => {
    //
    const [up, setUp] = useState(38)
    const [down, setDown] = useState(40)
    const [left, setLeft] = useState(37)
    const [right, setRight] = useState(39)
    const [shift] = useState(160)
    const [ctrl] = useState(162)
    const [alt] = useState(164)
    const [r, setR] = useState(82)
    const [dialog, setDialog] = useState(false)
    const [init, setInit] = useState(false)

    const addEventListener = () => {
        (window as any).electronAPI.initGlobalKey()
    }

    const getEvent = () => {
        (window as any).electronAPI.getEventChange((_event: any, value: any) => {
            // console.log(_event, value)
            const { event, type } = value
            if (event) {
                const tempList = [up, down, left, right, shift, ctrl, alt, r]
                if (tempList.includes(event.rawcode)) {
                    let dom: HTMLElement | null = null
                    switch (event.rawcode) {
                        case up:
                            dom = document.getElementById('up')
                            break;
                        case down:
                            dom = document.getElementById('down')
                            break;
                        case left:
                            dom = document.getElementById('left')
                            break;
                        case right:
                            dom = document.getElementById('right')
                            break;
                        case shift:
                            dom = document.getElementById('shift')
                            break;
                        case ctrl:
                            dom = document.getElementById('ctrl')
                            break;
                        case alt:
                            dom = document.getElementById('alt')
                            break;
                        case r:
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

    const setNewKey = (cb: (num: number) => void) => {
        setDialog(true)
        const changeKey = (e: any) => {
            window.removeEventListener('keyup', changeKey)
            setDialog(false)
            cb && cb(e.keyCode)
        }
        window.addEventListener('keyup', changeKey)
    }

    useEffect(() => {
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
                    <div id="r" className={['key', 'key-r'].join(' ')} onClick={() => { setNewKey(setR) }}>R</div>
                    <div id="up" className={['key', 'key-up'].join(' ')} onClick={() => { setNewKey(setUp) }}>↑</div>
                    <div id="ctrl" className={['key', 'key-direction'].join(' ')}>Ctrl</div>
                    <div id="alt" className={['key', 'key-direction'].join(' ')}>Alt</div>
                    <div id="left" className={['key', 'key-direction'].join(' ')} onClick={() => { setNewKey(setLeft) }}>←</div>
                    <div id="down" className={['key', 'key-direction'].join(' ')} onClick={() => { setNewKey(setDown) }}>↓</div>
                    <div id="right" className={['key', 'key-direction'].join(' ')} onClick={() => { setNewKey(setRight) }}>→</div>
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