import Nav from './components/nav'
import Home from "@/components/home";
import SelectMap from "@/components/selectMap/index.tsx";
import Scoring from "@/components/scoring/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef } from "react";
import { Provider } from "react-redux";
import store from "@/redux/scoring/store"
import './App.less'
import ShowRank from './components/scoring/showRank';

function App() {

  const navRef = useRef(null)

  //使用导航使用路由控制模块与流程
  return (
    <BrowserRouter>
      <div className='background'>
        <Nav ref={navRef} />
        <div className='content-main'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/selectMap' element={<SelectMap />}></Route>
            <Route path='/scoring' element={<Scoring />}></Route>
          </Routes>
          <Provider store={store}>
            <Routes>
              <Route path='/showRank' element={<ShowRank />} />
            </Routes>
          </Provider>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
