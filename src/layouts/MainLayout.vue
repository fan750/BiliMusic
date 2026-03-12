<template>
  <div class="core-layout">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <div class="brand">
        <h1>BiliMusic</h1>
      </div>
      
      <nav class="nav-menu">
        <router-link to="/mylist" class="nav-item" active-class="active">
          <span class="icon">🎵</span>
          <span class="label">我的歌单</span>
        </router-link>
        
        <router-link to="/recommend" class="nav-item" active-class="active">
          <span class="icon">❤️</span>
          <span class="label">每日推荐</span>
        </router-link>
      </nav>
    </aside>

    <!-- 主内容区 -->
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
/* 整个页面布局 */
.core-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f6f8fb;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #333;
  overflow: hidden;
  position: fixed; /* 确保布局固定在视口 */
  top: 0;
  left: 0;
}

/* 侧边栏样式 */
.sidebar {
  width: 240px;
  background: #ffffff;
  border-right: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  padding: 24px 20px;
  flex-shrink: 0;
  box-shadow: 4px 0 24px rgba(0,0,0,0.02);
  z-index: 10;
  overflow-y: auto; /* 允许侧边栏内容滚动 */
}

.brand {
  margin-bottom: 40px;
  padding-left: 12px;
}

.brand h1 {
  font-size: 1.5rem;
  font-weight: 800;
  color: #fb7299;
  margin: 0;
  letter-spacing: -0.5px;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  text-decoration: none;
  color: #666;
  font-weight: 500;
  transition: all 0.2s ease;
  gap: 12px;
}

.nav-item:hover {
  background-color: #f5f7fa;
  color: #333;
  transform: translateX(4px);
}

.nav-item.active {
  background-color: #fff0f5; /* 淡粉色背景 */
  color: #fb7299;
  font-weight: 600;
}

.nav-item .icon {
  font-size: 1.2rem;
}

.avatar {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #fb7299, #ff5c7c);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
}


/* 主内容区样式 */
.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 30px;
  position: relative;
}

/* 路由切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>