# 跑跑卡丁车小工具

这个小工具可以用于跑跑卡丁车选图和比赛计分，选车和分队考虑到分队成员的实力均衡问题和选车功能的实用性不清楚的问题暂时搁置一下，如果对这两个功能有什么想法的话欢迎给大老虎B站私信留言
该工具现在有计划继续更新，但个人工作比较忙，所以更新随缘（计划之后可能更新地图分类功能和预设地图库功能）
有能力的小伙伴希望能在github上为这个项目点个星支持一下大老虎哦

## 作者：蓝色大老虎

Github空间：<https://github.com/lansdarklauh>
b站空间：<https://space.bilibili.com/3221223>
b站直播间：<https://live.bilibili.com/6953239>
邮箱：<lansdarklauh@foxmail.com>

## 模块介绍

### 选图模块

导入地图库：要求格式为txt，地图间用回车隔开，可以将文件拖入，也可点击上传

```txt
神之国度 诸神世界
刀剑 云中峡谷
像素世界 圣诞秘密空间
童话世界 彩虹桥之门
……
```

选择地图池：从导入的地图库中选择地图池（即比赛用的地图，比如导入了竞速图的地图库后选择部分图做比赛图），在左框选择地图后点击 “ > ” 键将地图挪入右边地图池，也可在右边地图池中选中不需要的地图后点击 “ < ” 键挪出地图池

随机筛选地图：点击录入可以随机挑选录入一张地图，直至所有地图都以录入，已录入的地图则不会再次被录入，点击重置可以清空已录入地图，点击一键筛选会清空之前录入的地图后一次性随机录入所有地图（顺序随机）

### 计分模块

输入阶段分数：默认为8名制（即最多只有8个名次），若名次较少可修改阶段个数后点击生成进行重新划分，可输入每个名次应获得的分数

选手录入：在输入框输入选手名字，点击输入框右边颜色方块可选择选手颜色（喷漆色），点击录入则记录选手，可多次录入选手但不可多次录入同一位选手，点击重置则清空已录入选手

计分排名：显示项为选手名称，选手具体分数（每局获得分数，以加号分隔局次）和总分，默认按总分从大到小排序，点击新增则会弹出下拉框窗口，可按选手名次顺序依次点击名字，未完成选手则不需要点击，依次点击完成后按确定会计算该局选手得分加入总分然后重新排序表格，点击归零按钮可重置所有选手分数

展示排名：在计分排名模块可点击排名窗口新打开排名展示窗口，会自动获取此时的选手名称与对应分数，按总分从高到低从左到右排序，在计分排名模块若新增局数更新总分，可在展示排名窗口点击任意选手分数可重新获取选手分数并重新排序。该模块可用obs的窗口捕获功能展示（不可用浏览器捕获，会获取不了名次）

## 下载软件：Github下载

在蓝色大老虎github空间中找到Teager-Competition-Assistant后点击Releases可获取软件包与源码，分为web版与desktop版

### Web版

解压后进入文件，双击index.html即可使用，体积较小，但需要浏览器

### Desktop版

解压后双击exe文件即可使用，体积较大，不需要浏览器
