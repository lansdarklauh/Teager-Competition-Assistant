import Nav from './components/nav'
import Home from "@/components/home";
import SelectMap from "@/components/selectMap/index.tsx";
import Scoring from "@/components/scoring/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.less'

function App() {

  //使用导航使用路由控制模块与流程
  return (
    <BrowserRouter>
      <div className='background'>
        <Nav />
        <div className='content-main'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/selectMap' element={<SelectMap />}></Route>
            <Route path='/scoring' element={<Scoring />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
