
import React, { useEffect, useRef, useState } from "react";
import Confused from "@/assets/confused.png";
import ImportMapLib from "@/components/selectMap/importMapLib";
import { Button } from "antd";
import { useNavigate } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "@/redux/selectMap/store"
import '@/style/selectMap/map.less'
import SelectMapList from "./selectMapList";
import ChooseMap from "./chooseMap";
import { refMethod } from "@/interfaces";

const SelectMap: React.FC = () => {
    const importRef = useRef<refMethod>(null)
    const selectRef = useRef<refMethod>(null)
    const chooseRef = useRef<refMethod>(null)
    const [step, setStep] = useState(1)

    const history = useNavigate()
    //点击上一步的动作
    function lastStep(step: number) {
        if (step === 1) {
            history('/')
            location.reload()
        } else {
            const temp = step - 1
            setStep(temp)
            // switch (temp) {
            //     case 1:
            //         importRef!.current!.stepOption(() => { }, -1)
            //         break;
            //     case 2:
            //         selectRef!.current!.stepOption(() => { }, -1)
            //         break;
            //     default:
            //         break;
            // }
        }
    }
    function nextStep(step: number) {
        switch (step) {
            case 1:
                importRef!.current!.stepOption(() => {
                    setStep(step + 1)
                })
                break;
            case 2:
                selectRef!.current!.stepOption(() => {
                    setStep(step + 1)
                })
                break;
            case 3:
                chooseRef!.current!.stepOption()
                break;
            default:
                break;
        }
    }

    useEffect(() => { }, [])

    //选图模块
    return (
        <Provider store={store}>
            <div className='map-main'>
                {(() => {
                    switch (step) {
                        case 1:
                            return <ImportMapLib ref={importRef} />
                        case 2:
                            return <SelectMapList ref={selectRef} />
                        case 3:
                            return <ChooseMap ref={chooseRef} />
                        default:
                            return null;
                    }
                })()}
                <div className="button-box">
                    <Button className="button" onClick={() => { lastStep(step) }}>上一步</Button>
                    <Button className="button-confirm" onClick={() => { nextStep(step) }} type="primary">{step === 3 ? "重置" : "下一步"}</Button>
                </div>
                <img className="map-confused" src={Confused} alt="疑惑" />
            </div>
        </Provider>
    )
}
export default SelectMap