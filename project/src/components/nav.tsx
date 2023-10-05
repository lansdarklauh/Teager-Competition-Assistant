import { useState, useImperativeHandle, forwardRef } from 'react'
import { NavRouter } from '@/interfaces'
import {
    PictureOutlined, CalendarOutlined,
    AppstoreOutlined
    // CarOutlined, TeamOutlined
} from '@ant-design/icons';
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo_mini_white.png";
import '@/style/nav.less'

const Nav = forwardRef((_props, ref) => {
    // 路由跳转表，以后可添加或隐藏部分内容
    const [router] = useState<NavRouter[]>(
        [
            {
                name: '选图',
                router: () => <PictureOutlined />,
                link: '/selectMap'
            },
            {
                name: '计分',
                router: () => <CalendarOutlined />,
                link: '/scoring'
            },
            {
                name: '指法',
                router: () => <AppstoreOutlined />,
                link: '/keyShow'
            },
            // {
            //     name: '分队',
            //     router: () => <TeamOutlined />,
            //     link: '/divingTeam'
            // },
        ]
    )
    //当前路由
    const location = useLocation()
    const [currentModel, setCurrentModel] = useState<string>(location.pathname || '/')
    //点击后修改当前路由以改变导航样式
    const changeModel = (link: string) => {
        setCurrentModel(link)
    }

    useImperativeHandle(ref, () => ({
        changeModel
    }))

    return (
        //导航模块
        <>
            <div className='nav'>
                <div className='nav-content'>
                    <ul className='router-box'>
                        {
                            router.map(item =>
                                <li className={['router-button', item.link === currentModel ? 'select' : null].join(' ')} key={item.name} onClick={() => { changeModel(item.link || '') }}>
                                    <Link to={item.link || '/'}>
                                        {item.router({})}
                                        <span className='router-name'>{item.name}</span>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <Link to="/" className='nav-logo' onClick={() => { changeModel('/') }}>
                    <img src={logo} alt="logo" />
                </Link>
            </div>
        </>
    )
})
export default Nav