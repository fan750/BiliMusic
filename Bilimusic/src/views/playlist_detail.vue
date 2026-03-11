<template>
  <div class="playlist-page-wrapper">
    <div class="playlist-detail" v-if="playlist">
      <!-- 头部信息 -->
      <div class="playlist-header">
        <div class="cover-box">
          <img v-if="playlist.cover" :src="playlist.cover" class="cover-img" />
          <div v-else class="cover-placeholder">{{ playlist.name.charAt(0) }}</div>
        </div>
        <div class="info-box">
          <h2 class="title">{{ playlist.name }}</h2>
          <div class="meta">
            <span class="tag">歌单</span>
            <span class="count">{{ playlist.songs ? playlist.songs.length : 0 }} 首歌曲</span>
          </div>
          <p class="desc" v-if="playlist.description">{{ playlist.description }}</p>
          <div class="actions">
            <button class="btn-play-all">
              <span class="icon">▶</span> 播放全部
            </button>
            <button class="btn-add-music" @click="addMusic">
              <span class="icon">+</span> 添加音乐
            </button>
          </div>
        </div>
      </div>

      <!-- 歌曲列表 -->
      <div class="song-list-container">
        <div v-if="!playlist.songs || playlist.songs.length === 0" class="empty-songs">
          <p>这里还没有歌曲哦，快去添加吧！</p>
        </div>
        <table v-else class="song-table">
          <thead>
            <tr>
              <th class="col-index">#</th>
              <th class="col-title">标题</th>
              <th class="col-action">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(song, index) in playlist.songs" :key="index" class="song-row">
              <td class="col-index">{{ index + 1 }}</td>
              <td class="col-title">
                <div class="song-name">{{ song.name }}</div>
              </td>
              <td class="col-action">
                <button class="btn-icon play" title="播放" @click="playSong(song,index)">▶</button>
                <button class="btn-icon delete" title="移除" @click="removeSong(song)">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div v-else class="not-found">
      <h2>未找到歌单</h2>
      <p>正在加载或歌单不存在...</p>
      <button @click="router.back()" class="btn-back">返回</button>
    </div>

    <div v-if="playingSong" class="mini-player">
      <div class="player-header">
        <span class="playing-title" style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">正在播放: {{ playingSong.name }}</span>
        <button @click="closePlayer" class="player-close-btn">×</button>
      </div>
      <div class="iframe-box">
        <iframe
          ref="iframeRef"
          :src="`https://player.bilibili.com/player.html?bvid=${playingSong.bv}&autoplay=1&t=0&mute=0`"
          frameborder="0"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          style="width:0;height:0;"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import tools from '../list.js'

const route = useRoute()
const router = useRouter()
const playlist = ref(null)

const loadPlaylist = () => {
  const name = route.params.name
  console.log('Loading Playlist:', name)
  if (!name) return
  
  const allLists = tools.getAll()
  const found = allLists.find(l => l.name === name)
  
  if (found) {
    console.log('Found:', found)
    playlist.value = found
  } else {
    console.log('Not Found')
    playlist.value = null
  }
}

const removeSong = (song) => {
  if (confirm(`确定要移除歌曲 "${song.name}" 吗？`)) {
    tools.removeSong(playlist.value.name, song.name)
    loadPlaylist() // 重新加载
  }
}

const addMusic = () => {
    router.push({ name: 'addMusic', params: { name: playlist.value.name } })
}

const playingSong = ref(null)
let playTimer = null

const playSong = async (song, index) => {
  // 切换歌曲前清除上一首的定时器，防止多重定时器叠加
  if (playTimer) {
    clearTimeout(playTimer)
    playTimer = null
  }
  
  playingSong.value = song
  
  try {
    // 获取歌曲时长（秒）
    const duration = await tools.getSongTime(song.bv)
    
    // 确保当前播放的歌曲没有被用户手动切换掉
    if (playingSong.value && playingSong.value.bv === song.bv && duration > 0) {
      playTimer = setTimeout(() => {
        const nextIndex = (index + 1) % playlist.value.songs.length
        playSong(playlist.value.songs[nextIndex], nextIndex)
      }, duration * 1000)
    }
  } catch (error) {
    console.error('自动播放下一首失败:', error)
  }
}

const closePlayer = () => {
  if (playTimer) {
    clearTimeout(playTimer)
    playTimer = null
  }
  playingSong.value = null
}

onMounted(() => {
  loadPlaylist()
})

// 监听路由变化，如果参数变了重新加载
watch(() => route.params.name, () => {
  loadPlaylist()
})
</script>

<style scoped>
.playlist-detail {
  padding: 20px;
}

/* 头部样式 */
.playlist-header {
  display: flex;
  gap: 32px;
  margin-bottom: 40px;
}

.cover-box {
  width: 200px;
  height: 200px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  flex-shrink: 0;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  font-weight: 800;
  color: #ddd;
}

.info-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 16px 0;
  color: #333;
}

.meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.tag {
  border: 1px solid #fb7299;
  color: #fb7299;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
}

.count {
  color: #666;
  font-size: 0.95rem;
}

.desc {
  color: #888;
  font-size: 0.95rem;
  margin: 0 0 24px 0;
  line-height: 1.6;
  max-width: 600px;
}

.actions {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.btn-play-all {
  background-color: #fb7299;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(251, 114, 153, 0.3);
}

.btn-play-all:hover {
  background-color: #fc8bab;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(251, 114, 153, 0.4);
}

.btn-add-music {
  background-color: #ffffff;
  color: #333;
  border: 1px solid #e0e0e0;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

.btn-add-music:hover {
  background-color: #f7f9fa;
  border-color: #d0d0d0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* 歌曲列表样式 */
.song-list-container {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
}

.empty-songs {
  text-align: center;
  color: #999;
  padding: 40px;
}

.song-table {
  width: 100%;
  border-collapse: collapse;
}

.song-table th {
  text-align: left;
  padding: 12px 16px;
  color: #999;
  font-weight: 500;
  font-size: 0.9rem;
  border-bottom: 1px solid #f0f0f0;
}

.song-table td {
  padding: 16px;
  color: #333;
  border-bottom: 1px solid #f7f7f7;
  transition: background 0.2s;
}

.song-row:hover td {
  background-color: #fafafa;
}

.col-index {
  width: 60px;
  text-align: center;
  color: #bbb;
}

.col-title {
  font-weight: 500;
}

.col-action {
  width: 120px;
  text-align: right;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 4px 8px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.btn-icon:hover {
  opacity: 1;
}

.btn-icon.play {
  color: #fb7299;
}

.btn-icon.delete {
  color: #999;
}

.btn-icon.delete:hover {
  color: #ff4d4f;
}

.not-found {
  text-align: center;
  padding: 100px;
  color: #666;
}

.not-found h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.btn-back {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: white;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-back:hover {
  border-color: #fb7299;
  color: #fb7299;
}

/* 迷你播放器样式 */
.mini-player {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 320px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  z-index: 1000;
  overflow: hidden;
  border: 1px solid #eee;
  animation: slide-up 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
}

@keyframes slide-up {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

.player-header {
  padding: 12px 16px;
  background: #fcfcfc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

.playing-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 8px;
}

.player-close-btn {
  font-size: 20px;
  color: #999;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.player-close-btn:hover {
  background-color: #eee;
  color: #333;
}

.iframe-box {
  width: 0;
  height: 0;
  border: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  opacity: 0;
}

.bili-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>