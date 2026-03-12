# BiliMusic

一个基于 Vue 3 + Vite 开发的 Bilibili 音乐播放器原型项目。

## 功能

* [X] 营销落地页
* [X] 登录/注册页面原型
* [X] 本地歌单创建
* [X] 本地歌单列表展示
* [X] 歌单详情查看
* [X] 手动添加歌曲（通过输入 BV 号）
* [X] 从歌单中删除歌曲
* [X] 基于 **Bilibili 嵌入播放器**的单曲播放
* [X] 基础的下一首自动切换逻辑
* [ ] 真实用户登陆注册
* [ ] 歌单重命名与删除
* [ ] BV自动解析标题、封面、时长
* [ ] 播放全部
* [ ] 上一首/下一首
* [ ] 暂停/继续播放
* [ ] Bilibili搜索功能
* [ ] 推荐页
* [ ] 更完善的播放器控制
* [ ] 本地存储层（打包的话最好做SQLite）
* [ ] Electron桌面端接入

## 快速开始

### 进入项目目录
```bash
cd BiliMusic
```
### 安装依赖
```bash
npm install
```
### 启动开发环境
```bash
npm run dev
```

## 项目结构

```text
BiliMusic/
├─ public/                         # 静态资源
├─ src/
│  ├─ assets/                      # 由源码引用的资源文件
│  ├─ layouts/                     # 页面布局组件
│  │  └─ MainLayout.vue
│  ├─ router/                      # Vue Router 配置
│  │  └─ index.js
│  ├─ services/                    # 业务服务层
│  │  ├─ bilibiliService.js
│  │  ├─ playlistService.js
│  │  └─ storage/
│  │     └─ localStorageAdapter.js
│  ├─ styles/                      # 全局样式
│  │  └─ base.css
│  ├─ views/                       # 页面级组件
│  │  ├─ HomeView.vue
│  │  ├─ AuthView.vue
│  │  ├─ MyPlaylistsView.vue
│  │  ├─ CreatePlaylistView.vue
│  │  ├─ PlaylistDetailView.vue
│  │  ├─ AddMusicView.vue
│  │  └─ RecommendView.vue
│  ├─ App.vue                      # 根组件
│  └─ main.js                      # 应用入口
├─ docs/                           # 重构与说明文档
├─ electron/                       # 未来桌面端壳层预留目录
├─ index.html
├─ package.json
├─ package-lock.json
└─ vite.config.js
```

### `src` 目录说明

- `layouts/`：放应用整体框架，例如侧边栏和主内容区布局。
- `views/`：放路由直接对应的页面组件。
- `services/`：放业务逻辑和数据访问逻辑，避免页面直接操作 `localStorage` 或远程接口。
- `router/`：统一管理路由定义。
- `styles/`：放全局样式和基础主题样式。
- `assets/`：放会被源码直接引用的图片、图标等资源。

## License
MIT
