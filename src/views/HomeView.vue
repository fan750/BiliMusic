<template>
  <div class="intro-container">
    <!-- 背景动画层 -->
    <div class="background-animation">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
    </div>

    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="logo">BiliMusic</div>
      <div class="nav-links">
        <router-link to="/register" class="btn-login">登录 / 注册</router-link>
      </div>
    </nav>

    <!-- Hero 区域 -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="main-title">
          <span class="gradient-text">纯粹音乐</span> <br>
          <span class="sub-text">源自 Bilibili 的听觉盛宴</span>
        </h1>
        <p class="hero-desc">
          沉浸式播放体验，告别视频干扰。<br>
          汇聚千万 UP 主原创、翻唱与演奏作品。
        </p>
        <div class="cta-group">
          <router-link to="/register" class="btn-primary">
            立即开启
            <span class="arrow">→</span>
          </router-link>
          <a href="#features" class="btn-secondary">了解更多</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="music-card-mockup">
          <div class="album-art"></div>
          <div class="track-info">
            <div class="line line-1"></div>
            <div class="line line-2"></div>
          </div>
          <div class="progress-bar"></div>
          <div class="controls">
            <div class="btn-circle"></div>
            <div class="btn-circle big"></div>
            <div class="btn-circle"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特性展示 -->
    <section id="features" class="features-section">
      <h2 class="section-title">重新定义你的聆听方式</h2>
      <div class="grid-container">
        <div class="feature-card glass">
          <div class="card-icon">🌊</div>
          <h3>海量曲库</h3>
          <p>无缝接入 Bilibili 音频生态，千万首原创、翻唱、Vocaloid 作品触手可及。</p>
        </div>
        <div class="feature-card glass">
          <div class="card-icon">🎧</div>
          <h3>沉浸体验</h3>
          <p>专注音频播放，支持后台运行。没有杂乱的视频流，只有纯粹的音乐享受。</p>
        </div>
        <div class="feature-card glass">
          <div class="card-icon">⚡</div>
          <h3>极速纯净</h3>
          <p>轻量级架构，秒开无广告。拒绝臃肿，只为最纯粹的听歌体验而生。</p>
        </div>
        <div class="feature-card glass">
          <div class="card-icon">☁️</div>
          <h3>云端同步</h3>
          <p>注册账号即可云端同步你的收藏歌单，多设备无缝切换。</p>
        </div>
        <div class="feature-card glass">
          <div class="card-icon">🧠</div>
          <h3>智能推荐</h3>
          <p>由算法驱动的每日推荐，精准捕捉你的听歌喜好，发现更多宝藏。</p>
        </div>
        <div class="feature-card glass">
          <div class="card-icon">💬</div>
          <h3>社区互动</h3>
          <p>保留 Bilibili 灵魂评论区，边听边看，寻找音乐中的共鸣。</p>
        </div>
      </div>
    </section>

    <!-- 底部呼吁 -->
    <section class="footer-cta">
      <h2>准备好开始了吗？</h2>
      <router-link to="/register" class="btn-primary large">免费注册体验</router-link>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* 全局容器与字体 - 白底黑字简约风 */
.intro-container {
  min-height: 100vh;
  background-color: #ffffff;
  color: #2c3e50;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  overflow-x: hidden;
  position: relative;
}

/* 动态背景 - 更清透柔和 */
.background-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  background: radial-gradient(circle at top right, #fff5f7 0%, #fff 40%, #f0f7ff 100%);
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.15; /* 降低不透明度 */
  animation: float 10s infinite ease-in-out;
}

.blob-1 {
  width: 600px;
  height: 600px;
  background: #fb7299;
  top: -200px;
  right: -200px;
  animation-delay: 0s;
}

.blob-2 {
  width: 700px;
  height: 700px;
  background: #00a1d6;
  bottom: -200px;
  left: -200px;
  animation-delay: -5s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, 50px) scale(1.05); }
}

/* 导航栏 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 8%;
  position: relative;
  z-index: 10;
}

.logo {
  font-size: 1.6rem;
  font-weight: 800;
  color: #333;
  letter-spacing: -0.5px;
}

.btn-login {
  color: #666;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  font-size: 1rem;
}

.btn-login:hover {
  color: #fb7299;
}

/* Hero 区域 */
.hero-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  padding: 0 8%;
  text-align: center;
  position: relative;
  z-index: 1;
}

@media (min-width: 960px) {
  .hero-section {
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
  }
  .hero-content {
    max-width: 48%;
  }
}

.main-title {
  font-size: clamp(3rem, 5vw, 4.5rem);
  line-height: 1.15;
  font-weight: 900;
  margin-bottom: 24px;
  color: #222;
  letter-spacing: -1px;
}

.gradient-text {
  background: linear-gradient(135deg, #fb7299 0%, #ff5c7c 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.sub-text {
  display: block;
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  color: #555;
  margin-top: 16px;
  font-weight: 400;
}

.hero-desc {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 48px;
  max-width: 580px;
}

.cta-group {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

@media (min-width: 960px) {
  .cta-group {
    justify-content: flex-start;
  }
}

.btn-primary {
  background: #fb7299;
  color: white;
  padding: 16px 36px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(251, 114, 153, 0.3);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(251, 114, 153, 0.4);
  background: #fc8bab;
}

.arrow {
  transition: transform 0.3s;
}

.btn-primary:hover .arrow {
  transform: translateX(4px);
}

.btn-secondary {
  color: #555;
  background: #fff;
  text-decoration: none;
  font-weight: 500;
  padding: 16px 28px;
  border: 1px solid #e0e0e0;
  border-radius: 50px;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: #f8f8f8;
  border-color: #ccc;
  color: #333;
  transform: translateY(-2px);
}

/* 视觉Mockup - 现代化卡片风格 */
.hero-visual {
  margin-top: 60px;
  position: relative;
}

@media (min-width: 960px) {
  .hero-visual {
    margin-top: 0;
  }
}

.music-card-mockup {
  width: 320px;
  height: 520px;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.03);
  border-radius: 32px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 60px -15px rgba(0,0,0,0.1);
  transform: rotate(-3deg);
  transition: transform 0.5s ease;
}

.music-card-mockup:hover {
  transform: rotate(0deg) scale(1.02);
  box-shadow: 0 40px 70px -15px rgba(0,0,0,0.12);
}

.album-art {
  width: 100%;
  aspect-ratio: 1;
  background: linear-gradient(135deg, #ffd1de 0%, #d4efff 100%);
  border-radius: 20px;
  margin-bottom: 30px;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.03);
  position: relative;
  overflow: hidden;
}

/* 模拟简单的专辑封面内容 */
.album-art::after {
  content: '🎵';
  font-size: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.2;
}

.track-info .line {
  height: 12px;
  background: #f0f2f5;
  border-radius: 6px;
  margin-bottom: 12px;
}

.track-info .line-1 { width: 70%; background: #e1e4e8; }
.track-info .line-2 { width: 40%; }

.progress-bar {
  height: 4px;
  background: #f0f2f5;
  border-radius: 2px;
  margin: 40px 0;
  position: relative;
}

.progress-bar::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 40%;
  background: #fb7299;
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(251, 114, 153, 0.5);
}

.controls {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.btn-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f5f7fa;
  transition: background 0.2s;
}

.btn-circle:hover {
  background: #eef1f5;
}

.btn-circle.big {
  width: 70px;
  height: 70px;
  background: #fff;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-circle.big::after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 0 10px 18px;
    border-color: transparent transparent transparent #fb7299;
    margin-left: 4px;
}

/* 特性部分 */
.features-section {
  padding: 120px 8%;
  position: relative;
  z-index: 1;
}

.section-title {
  text-align: center;
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 80px;
  color: #222;
  letter-spacing: -1px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.feature-card.glass {
  background: #fff;
  border: 1px solid #eee;
  padding: 48px 36px;
  border-radius: 24px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}

.feature-card.glass:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.08);
  border-color: transparent;
}

.card-icon {
  font-size: 3.5rem;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #fb7299 0%, #00a1d6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.feature-card h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #222;
}

.feature-card p {
  color: #666;
  font-size: 1rem;
  line-height: 1.7;
}

/* 底部 CTA */
.footer-cta {
  text-align: center;
  padding: 120px 20px;
  position: relative;
  z-index: 1;
  background: linear-gradient(to top, rgba(251, 114, 153, 0.05), transparent);
}

.footer-cta h2 {
  font-size: 3rem;
  margin-bottom: 50px;
  color: #222;
  font-weight: 800;
}

.btn-primary.large {
  padding: 20px 56px;
  font-size: 1.35rem;
  box-shadow: 0 20px 40px rgba(251, 114, 153, 0.3);
}

.btn-primary.large:hover {
  box-shadow: 0 25px 50px rgba(251, 114, 153, 0.4);
}
</style>