# 2026-03-12 项目结构重构总结

## 本次重构目标

- 将真正的 Vue + Vite 前端项目从 `Bilimusic/` 提升到仓库根目录。
- 统一页面与布局组件命名，使用更清晰的 PascalCase 命名方式。
- 为 `src` 增加最小但清晰的分层：`layouts`、`services`、`styles`。
- 在不改变当前用户可见行为的前提下，为后续接入 Electron 做准备。

## 本次改动内容

### 一、仓库根目录调整

已将原先位于 `Bilimusic/` 下的实际前端项目文件迁移到仓库根目录，包括：

- `public/`
- `src/`
- `index.html`
- `package.json`
- `package-lock.json`
- `vite.config.js`

同时保留了当前仓库根目录下的项目说明文档 [`README.md`](/D:/Github/BiliMusic/README.md) 作为主 README。

另外新增了一个 `electron/README.md` 作为未来桌面端壳层的预留目录说明。

### 二、`src` 目录结构调整

新增了以下目录：

- `src/layouts/`
- `src/services/`
- `src/services/storage/`
- `src/styles/`

并完成以下迁移：

- `Corepage.vue` -> `layouts/MainLayout.vue`
- `style.css` -> `styles/base.css`

### 三、页面命名规范化

为了统一 Vue 页面组件命名方式，本次将原有页面文件重命名为更规范的 PascalCase + View 形式：

- `views/introduction.vue` -> `views/HomeView.vue`
- `views/register.vue` -> `views/AuthView.vue`
- `views/mylist.vue` -> `views/MyPlaylistsView.vue`
- `views/addlist.vue` -> `views/CreatePlaylistView.vue`
- `views/playlist_detail.vue` -> `views/PlaylistDetailView.vue`
- `views/addMusic.vue` -> `views/AddMusicView.vue`
- `views/recommend.vue` -> `views/RecommendView.vue`

### 四、服务层拆分

原先的 `src/list.js` 同时承担了：

- 本地歌单存储
- 歌单增删改
- Bilibili 时长接口调用

职责过于集中，因此本次拆分为：

- [`src/services/storage/localStorageAdapter.js`](/D:/Github/BiliMusic/src/services/storage/localStorageAdapter.js)
  - 负责 `localStorage` 的读写
- [`src/services/playlistService.js`](/D:/Github/BiliMusic/src/services/playlistService.js)
  - 负责歌单与歌曲的本地业务逻辑
- [`src/services/bilibiliService.js`](/D:/Github/BiliMusic/src/services/bilibiliService.js)
  - 负责 Bilibili 相关接口访问

### 五、路由整理

已更新路由文件 [`src/router/index.js`](/D:/Github/BiliMusic/src/router/index.js)，完成：

- 新文件路径引用修正
- 主布局组件切换为 `MainLayout`
- 路由名称统一为 lower camelCase

当前路由名包括：

- `home`
- `auth`
- `myPlaylists`
- `recommend`
- `createPlaylist`
- `playlistDetail`
- `addMusic`

为了降低这次重构风险，URL 路径本身暂时保持不变，没有同步改为 `kebab-case`。

### 六、推荐页补位

原先的推荐页是空模板。本次先将其改为一个“开发中”占位页，避免点击导航后出现空白页面。

## 兼容性与运行验证

本次重构后，已在仓库根目录执行并通过以下命令：

```bash
npm install
npm run build
```

验证结果：构建成功。
