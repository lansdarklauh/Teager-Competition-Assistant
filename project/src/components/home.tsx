
import React from "react";
import Author from "@/assets/name.png";
import Shy from "@/assets/shy.png";
import '@/style/home.less'

const Home: React.FC = () => {
    return (
        //主页介绍模块
        <>
            <div className='home-main'>
                <h1 className="home-title">
                    跑跑比赛小助手
                </h1>
                <div className="home-author">
                    <span>作者：</span>
                    <img src={Author} alt="蓝色大老虎" />
                </div>
                <div className="home-description">
                    该系统为跑跑卡丁车比赛（私人/公开）提供多项便利功能，包括随机选择比赛地图，统计选手计分，随机选择比赛用车和比赛成员随机分队功能，使用详情可进入对应模块查看使用说明书
                    <p className="home-details">联系作者：<br />
                        <a href="https://space.bilibili.com/3221223" target="blank" className="bilibili">B站：H蓝色大老虎H</a><br />
                        <span className="e-mail">邮箱：1343560302@qq.com</span>
                    </p>
                </div>
                <img className="home-shy" src={Shy} alt="害羞" />
            </div>
        </>
    )
}
export default Home