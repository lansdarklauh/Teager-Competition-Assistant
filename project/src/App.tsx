import Nav from './components/nav'
import Home from "@/components/home";
import SelectMap from "@/components/selectMap/index.tsx";
import Scoring from "@/components/scoring/index";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import './App.less'
import ShowRank from './components/scoring/showRank';
import * as PIXI from 'pixi.js';
import {
  Live2DModel
} from 'pixi-live2d-display/cubism4';
import { CSSTransition } from 'react-transition-group'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;

function App() {
  // 将 PIXI 暴露到 window 上，这样插件就可以通过 window.PIXI.Ticker 来自动更新模型
  window.PIXI = PIXI;

  const live2dLoad = async function () {
    if (!document.getElementById('canvas')) return
    const app = new PIXI.Application({
      view: document.getElementById('canvas') as HTMLCanvasElement,
      transparent: true,
      autoDensity: true,
      antialias: true,
      autoStart: true,
      // 高度
      height: 300,
      // 宽度
      width: 300
    });

    const model = await Live2DModel.from('src/assets/live2D/laohu.model3.json');

    const canvasElement = document.getElementById('canvas')

    if (canvasElement) document.addEventListener('pointermove', (event) => {
      model.focus(model._bounds.maxX / 2 + (event.clientX - window.innerWidth) + 110, model._bounds.maxY / 2 + (event.clientY - window.innerHeight) + 200)
    });

    // if (canvasElement) canvasElement.addEventListener('pointerdown', (event) => {
    //   model.tap(model._bounds.maxX / 2 + (event.clientX - window.innerWidth) + 110, model._bounds.maxY / 2 + (event.clientY - window.innerHeight) + 200)
    // });

    let clickNum = 0
    let clickControl = false

    if (canvasElement) canvasElement.addEventListener('pointerup', () => {
      console.log('aaa')
      if (clickControl) return
      clickControl = true
      const message = document.createElement('span')
      switch (clickNum) {
        case 0:
          message.textContent = "别点了，啥都没有……";
          break;
        case 1:
          message.textContent = "真别点了，我懒得做……";
          break;
        case 2:
          message.textContent = "过分了啊！";
          break;
        case 3:
          message.textContent = "淦！再见！";
          break
        case 4:
          message.textContent = "……不理你了，哼😒！";
          break
        default:
          return ""
      }
      message.style.cssText = `position:absolute;left:${canvasElement.offsetLeft}px;top:${canvasElement.offsetTop}px;font-size:25px;font-weight:600;color:#ffffff;-webkit-text-stroke:1px #08979C;z-index:15;user-select:none;`
      if (canvasElement.parentElement) canvasElement.parentElement.appendChild(message)
      if (clickNum === 3)
        setTimeout(() => {
          if (canvasElement.parentElement) canvasElement.parentElement.removeChild(message)
          canvasElement.style.visibility = 'hidden'
          setLive2D(false)
        }, 2000)
      setTimeout(() => {
        if (canvasElement.parentElement && clickNum !== 3) canvasElement.parentElement.removeChild(message)
        if (clickNum <= 4) clickNum++
        clickControl = false
      }, 5000)
    });

    app.stage.addChild(model);

    // 变换
    model.x = -100;
    model.y = 0;
    // model.rotation = Math.PI;
    // model.skew.x = Math.PI;
    model.scale.set(0.1);
    // model.anchor.set(0.5, 0.5);
    // 添加模型状态管理器
    // model.internalModel = new InternalModel()
    // model.internalModel = a
    // model.registerInteraction()

    // 交互
    // model.on('hit', (hitAreas) => {
    //   console.log('aaa')
    // });

  };


  const navRef = useRef(null)

  const [live2D, setLive2D] = useState(false)

  const changeShowLive2D = () => {
    const flag = live2D ? false : true
    setLive2D(flag)
  }

  useEffect(() => {
    live2dLoad()
  }, [])

  //使用导航使用路由控制模块与流程
  return (
    <HashRouter>
      <div className='background'>
        <Nav ref={navRef} />
        <div className='content-main' style={{ display: location.hash !== '#/showRank' ? 'block' : 'none' }}>
          <Routes>
            <Route path='/' element={<Home changeShowLive2D={changeShowLive2D} />}></Route>
            <Route path='/selectMap' element={<SelectMap />}></Route>
            <Route path='/scoring' element={<Scoring />}></Route>
          </Routes>
        </div>
        <div className='rank_win' style={{ display: location.hash === '#/showRank' ? 'block' : 'none' }}>
          <Routes>
            <Route path='/showRank' element={<ShowRank />} />
          </Routes>
        </div>
        <CSSTransition in={live2D} timeout={1000} classNames='fade' apper={'true'}>
          <canvas id='canvas' className='live2d' style={{ visibility: live2D && (location.hash !== '#/showRank') ? 'visible' : 'hidden' }}></canvas>
        </CSSTransition>
      </div>
    </HashRouter >
  )
}

export default App
