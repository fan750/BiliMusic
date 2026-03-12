<template>
  <section class="recommend-page">
    <div class="recommend-card">
      <span class="tag">开发中</span>
      <h2>每日推荐正在建设中</h2>
      <p>
        当前版本已经完成歌单管理与基础播放原型，推荐系统会在后续版本补上。
      </p>
    </div>
  </section>
</template>

<style scoped>
.recommend-page {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
}

.recommend-card {
  width: min(100%, 640px);
  padding: 40px;
  border-radius: 24px;
  background: linear-gradient(135deg, #fff7fa 0%, #ffffff 100%);
  border: 1px solid #f4d7e1;
  box-shadow: 0 18px 40px rgba(251, 114, 153, 0.08);
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  background: #fff0f5;
  color: #fb7299;
  font-size: 0.85rem;
  font-weight: 700;
}

h2 {
  margin: 16px 0 12px;
  color: #222;
  font-size: 2rem;
}

p {
  margin: 0;
  color: #666;
  line-height: 1.7;
  font-size: 1rem;
}
</style>
