import Nav from './components/nav'
import Home from "@/components/home";
import SelectMap from "@/components/selectMap/index.tsx";
import Scoring from "@/components/scoring/index";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useRef } from "react";
import './App.less'
import ShowRank from './components/scoring/showRank';

function App() {

  const navRef = useRef(null)

  //使用导航使用路由控制模块与流程
  return (
    <HashRouter>
      <div className='background'>
        <Nav ref={navRef} />
        <div className='content-main' style={{ display: location.hash !== '#/showRank' ? 'block' : 'none' }}>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/selectMap' element={<SelectMap />}></Route>
            <Route path='/scoring' element={<Scoring />}></Route>
          </Routes>
        </div>
        <div className='rank_win' style={{ display: location.hash === '#/showRank' ? 'block' : 'none' }}>
          <Routes>
            <Route path='/showRank' element={<ShowRank />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}

export default App
