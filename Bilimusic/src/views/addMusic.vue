<template>
  <div class="add-music-page">
    <div class="card-container">
      <div class="header-section">
        <h2>添加歌曲</h2>
        <p class="subtitle">添加到歌单: <strong>{{ playlistName }}</strong></p>
      </div>

      <form @submit.prevent="handleSubmit" class="form-body">
        <div class="form-group">
          <label for="songName">歌曲名称</label>
          <input 
            id="songName" 
            type="text" 
            v-model="songName" 
            placeholder="请输入歌曲名称" 
            required
            class="input-field"
          />
        </div>

        <div class="form-group">
          <label for="bvId">BV号</label>
          <input 
            id="bvId" 
            type="text" 
            v-model="bvId" 
            placeholder="请输入视频 BV 号 (例如: BV1xxxxxx)" 
            required
            class="input-field"
          />
        </div>

        <div class="action-buttons">
          <button type="button" @click="goBack" class="btn-cancel">取消</button>
          <button type="submit" class="btn-submit" :disabled="!isFormValid">
            添加
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import tools from '../list.js'

const route = useRoute()
const router = useRouter()

const playlistName = route.params.name
const songName = ref('')
const bvId = ref('')

const isFormValid = computed(() => {
  return songName.value.trim() !== '' && bvId.value.trim() !== ''
})

const handleSubmit = () => {
    if (!isFormValid.value) return

    try {
        tools.addSong(playlistName, songName.value, bvId.value)
        alert('歌曲添加成功！')
        goBack()
    } catch (error) {
        console.error(error)
        alert('添加失败，请重试')
    }
}

const goBack = () => {
  router.push({ name: 'PlaylistDetail', params: { name: playlistName } })
}
</script>

<style scoped>
.add-music-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100%;
  padding-top: 60px;
}

.card-container {
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0f0f0;
}

.header-section {
  margin-bottom: 32px;
  text-align: center;
}

.header-section h2 {
  font-size: 1.8rem;
  color: #333;
  margin: 0 0 8px 0;
  font-weight: 700;
}

.subtitle {
  color: #666;
  font-size: 1rem;
  margin: 0;
}

.subtitle strong {
    color: #fb7299;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #444;
  margin-left: 4px;
}

.input-field {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #f9f9f9;
  font-size: 1rem;
  color: #333;
  transition: all 0.2s ease;
  font-family: inherit;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  border-color: #fb7299;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(251, 114, 153, 0.1);
}

.action-buttons {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.btn-submit,
.btn-cancel {
  padding: 14px 24px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  flex: 1;
}

.btn-submit {
  background: linear-gradient(135deg, #fb7299, #ff5c7c);
  color: white;
  box-shadow: 0 8px 16px rgba(251, 114, 153, 0.2);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px rgba(251, 114, 153, 0.3);
}

.btn-submit:disabled {
  background: #eccdd6;
  cursor: not-allowed;
  box-shadow: none;
}

.btn-cancel {
  background-color: #f5f5f5;
  color: #666;
}

.btn-cancel:hover {
  background-color: #eeeeee;
  color: #333;
}
</style>
