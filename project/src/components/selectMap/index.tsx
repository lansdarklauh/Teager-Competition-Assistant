
import React, { useRef, useState } from "react";
import Confused from "@/assets/confused.png";
import ImportMapLib from "@/components/selectMap/importMapLib";
import { Button } from "antd";
import { useNavigate } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "@/redux/selectMap/store"
import '@/style/selectMap/map.less'
import SelectMapList from "./selectMapList";

const SelectMap: React.FC = () => {
    const importRef = useRef<{ nextStep: () => void }>(null)
    const selectRef = useRef<{ nextStep: () => void }>(null)
    const [step, setStep] = useState(1)
    const history = useNavigate()
    //点击上一步的动作
    function lastStep(step: number) {
        if (step === 1) {
            history('/')
        } else {
            setStep(step - 1)
        }
    }
    function nextStep(step: number) {
        switch (step) {
            case 1:
                importRef!.current!.nextStep()
                setStep(step + 1)
                break;
            case 2:
                selectRef!.current!.nextStep()
                setStep(step + 1)
                break;
            default:
                break;
        }
    }

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
                        default:
                            return null;
                    }
                })()}
                <div className="button-box">
                    <Button className="button" onClick={() => { lastStep(step) }}>上一步</Button>
                    <Button className="button-confirm" onClick={() => { nextStep(step) }} type="primary">下一步</Button>
                </div>
                <img className="map-confused" src={Confused} alt="疑惑" />
            </div>
        </Provider>
    )
}
export default SelectMap