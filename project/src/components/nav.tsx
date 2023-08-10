import { useState } from 'react'
import { NavRouter } from '@/interfaces'
import React from "react";
import { PictureOutlined, CalendarOutlined, CarOutlined, TeamOutlined } from '@ant-design/icons';
import '@/style/nav.less'

const Nav: React.FC = () => {
    const [router, setCount] = useState<NavRouter[]>(
        [
            {
                name: '选图',
                router: () => <PictureOutlined />
            },
            {
                name: '计分',
                router: () => <CalendarOutlined />
            },
            {
                name: '选车',
                router: () => <CarOutlined />
            },
            {
                name: '分队',
                router: () => <TeamOutlined />
            },
        ]
    )

    return (
        <>
            <div className='nav'>
                <div className='nav-content'>
                    <ul className='router-box'>
                        {
                            router.map(item =>
                                <li className='router-button' key={item.name}>
                                    {item.router({})}
                                    <span className='router-name'>{item.name}</span>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Nav