import Nav from './components/nav'
import Home from "@/components/home";
import SelectMap from "@/components/selectMap/index.tsx";
import Scoring from "@/components/scoring/index";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import './App.less'
import ShowRank from './components/scoring/showRank';
import * as PIXI from 'pixi.js';
import {
  Live2DModel
} from 'pixi-live2d-display/cubism4';

function App() {
  // 将 PIXI 暴露到 window 上，这样插件就可以通过 window.PIXI.Ticker 来自动更新模型
  window.PIXI = PIXI;

  const live2dLoad = async function () {
    const app = new PIXI.Application({
      view: document.getElementById('canvas'),
      transparent: true,
      autoDensity: true,
      autoResize: true,
      antialias: true,
      autoStart: true,
      // 高度
      height: 300,
      // 宽度
      width: 300
    });

    const model = await Live2DModel.from('src/assets/live2D/laohu.model3.json');

    const canvasElement = document.getElementById('canvas')

    canvasElement.addEventListener('pointermove', (event) => model.focus(event.clientX, event.clientY));

    canvasElement.addEventListener('pointerdown', (event) => model.tap(event.clientX, event.clientY));

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
    model.on('hit', (hitAreas) => {
      if (hitAreas.includes('body')) {
        model.motion('Huishou');
      }
    });
  };

  const navRef = useRef(null)

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
        {/* <canvas ref={canvasRef}></canvas> */}
        <canvas id='canvas' style={{ position: 'absolute', bottom: 0, right: 0 }}></canvas>
      </div>
    </HashRouter>
  )
}

export default App
