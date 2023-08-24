
import React, { useRef, useState } from "react";
import Wicked from "@/assets/wicked.png";
import { Button } from "antd";
import { useNavigate } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "@/redux/scoring/store"
import '@/style/scoring/scoring.less'
import Diving from "@/components/scoring/diving";
import { refMethod } from "@/interfaces";

const SelectMap: React.FC = () => {
    const divingRef = useRef<refMethod>(null)
    const selectRef = useRef<refMethod>(null)
    const chooseRef = useRef<refMethod>(null)
    const [step, setStep] = useState(1)
    const history = useNavigate()
    //点击上一步的动作
    function lastStep(step: number) {
        if (step === 1) {
            history('/')
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

    //选图模块
    return (
        <Provider store={store}>
            <div className='map-main'>
                {(() => {
                    switch (step) {
                        case 1:
                            return <Diving ref={divingRef} />
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
                    <Button className="button-confirm" onClick={() => { nextStep(step) }} type="primary">{step === 3 ? "新增" : "下一步"}</Button>
                </div>
                <img className="map-confused" src={Wicked} alt="坏笑" />
            </div>
        </Provider>
    )
}
export default SelectMap