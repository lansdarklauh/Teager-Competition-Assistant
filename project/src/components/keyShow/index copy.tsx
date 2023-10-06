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
    const [pressList, setPressList] = useState<number[]>([])

    const addEventListener = () => {
        (window as any).electronAPI.initGlobalKey()
    }

    const getEvent = () => {
        (window as any).electronAPI.getEventChange((_event: any, value: any) => {
            // console.log(_event, value)
            const { event, type } = value
            console.log(pressList)
            if (event) {
                const tempList = [up, down, left, right, shift, ctrl, alt, r]
                if (tempList.includes(event.rawcode)) {
                    if (pressList.includes(event.rawcode) && type === 'keyup') {
                        setPressList(pressList.filter(item => {
                            item !== event.rawcode
                        }))
                    } else if (!pressList.includes(event.rawcode) && type === 'keydown') {
                        const temp = [...pressList]
                        temp.push(event.rawcode)
                        setPressList(temp)
                    }
                }
                // console.log(event)
            }
        })
    }

    const setNewKey = (cb: (num: number) => void) => {
        setDialog(true)
        const changeKey = (e: any) => {
            setPressList([])
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
                    <div className={[!pressList.includes(shift) ? 'key' : 'key-down', 'key-shift'].join(' ')}>Shift</div>
                    <div className={[!pressList.includes(r) ? 'key' : 'key-down', 'key-r'].join(' ')} onClick={() => { setNewKey(setR) }}>R</div>
                    <div className={[!pressList.includes(up) ? 'key' : 'key-down', 'key-up'].join(' ')} onClick={() => { setNewKey(setUp) }}>↑</div>
                    <div className={[!pressList.includes(ctrl) ? 'key' : 'key-down', 'key-direction'].join(' ')}>Ctrl</div>
                    <div className={[!pressList.includes(alt) ? 'key' : 'key-down', 'key-direction'].join(' ')}>Alt</div>
                    <div className={[!pressList.includes(left) ? 'key' : 'key-down', 'key-direction'].join(' ')} onClick={() => { setNewKey(setLeft) }}>←</div>
                    <div className={[!pressList.includes(down) ? 'key' : 'key-down', 'key-direction'].join(' ')} onClick={() => { setNewKey(setDown) }}>↓</div>
                    <div className={[!pressList.includes(right) ? 'key' : 'key-down', 'key-direction'].join(' ')} onClick={() => { setNewKey(setRight) }}>→</div>
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