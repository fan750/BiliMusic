<template>
  <div class="my-list-page">
    <div class="page-header">
      <div class="header-left">
        <h2>我的歌单</h2>
        <p>共 {{ list.length }} 个歌单</p>
      </div>
      <button class="btn-create" @click="goToAddList">
        <span>+</span> 新建歌单
      </button>
    </div>

    <!-- 列表为空时的展示 -->
    <div v-if="list.length === 0" class="empty-state">
      <div class="empty-icon">🎵</div>
      <h3>暂无歌单</h3>
      <p>创建一个歌单，开始收藏你的宝藏音乐吧</p>
      <button class="btn-create large" @click="goToAddList">立即创建</button>
    </div>

    <!-- 歌单网格 -->
    <div v-else class="playlist-grid">
      <div v-for="(item, index) in list" :key="index" class="playlist-card">
        <div class="card-cover">
          <div class="cover-placeholder">{{ item.name.charAt(0) }}</div>
          
          <!-- 悬停遮罩层 -->
          <div class="hover-overlay">
            <div class="description-text" v-if="item.description">
              {{ item.description }}
            </div>
            <div class="play-icon" @click.stop="goToPlaylist(item.name)">▶</div>
          </div>
        </div>
        <div class="card-info">
          <h3>{{ item.name }}</h3>
          <p>{{ item.songs ? item.songs.length : 0 }} 首歌曲</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import tools from '../list.js'

const router = useRouter()
const list = ref([])

onMounted(() => {
  list.value = tools.getAll()
})

const goToAddList = () => {
  router.push('/addlist')
}

const goToPlaylist = (name) => {
  router.push({ name: 'PlaylistDetail', params: { name } })
}
</script>

<style scoped>
.my-list-page {
  padding: 0 10px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.header-left h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #333;
}

.header-left p {
  color: #888;
  font-size: 0.9rem;
  margin: 0;
}

.btn-create {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #fb7299;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(251, 114, 153, 0.3);
  margin-right: 30px/* 让按钮稍微靠左一点 */
}

.btn-create:hover {
  background-color: #fc8bab;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(251, 114, 153, 0.4);
}

.btn-create.large {
  padding: 16px 36px;
  font-size: 1.1rem;
  margin-top: 24px;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  text-align: center;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 24px;
  opacity: 0.2;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 12px;
}

.empty-state p {
  color: #888;
  margin-bottom: 0;
}

/* 歌单网格 */
.playlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 32px;
}

.playlist-card {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.playlist-card:hover {
  transform: translateY(-8px);
}

.card-cover {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  background: #f0f0f0;
  margin-bottom: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: 800;
  color: #ddd;
  background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 20px;
  box-sizing: border-box;
}

.card-cover:hover .hover-overlay {
  opacity: 1;
}

.description-text {
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4; /* 标准属性 */
  -webkit-box-orient: vertical;
  line-height: 1.5;
  opacity: 0.9;
  overflow-wrap: break-word; /* 防止长单词溢出 */
}

.play-icon {
  font-size: 3rem;
  color: #fff;
  text-shadow: 0 4px 8px rgba(0,0,0,0.3);
  transition: transform 0.2s;
}

.card-cover:hover .play-icon:hover {
  transform: scale(1.1);
  color: #fb7299;
}

.card-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 6px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-info p {
  font-size: 0.9rem;
  color: #999;
  margin: 0;
}
</style>