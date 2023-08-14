
import React from "react";
import Confused from "@/assets/confused.png";
import Import from "@/components/selectMap/import";
import '@/style/selectMap/map.less'

const SelectMap: React.FC = () => {
    //选图模块
    return (
        <>
            <div className='map-main'>
                <Import />
                <img className="map-confused" src={Confused} alt="疑惑" />
            </div>
        </>
    )
}
export default SelectMap