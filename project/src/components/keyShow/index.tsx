
import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/keyShow/store"
import '@/style/scoring/scoring.less'
import KeyShow from "./keyShow";

const Scoring: React.FC = () => {

    //选图模块
    return (
        <Provider store={store}>
            <KeyShow />
        </Provider>
    )
}
export default Scoring