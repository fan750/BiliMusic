<template>
  <div class="add-list-page">
    <div class="card-container">
      <div class="header-section">
        <h2>新建歌单</h2>
        <p class="subtitle">创建属于你的音乐收藏夹</p>
      </div>

      <form @submit.prevent="handleSubmit" class="form-body">
        <div class="form-group">
          <label for="listName">歌单名称</label>
          <input 
            id="listName" 
            type="text" 
            v-model="listName" 
            placeholder="给歌单起个好听的名字..." 
            required
            class="input-field"
          />
        </div>

        <div class="form-group">
          <label for="description">简介 (可选)</label>
          <textarea 
            id="description" 
            v-model="description" 
            placeholder="介绍一下这个歌单的故事..." 
            rows="4"
            class="textarea-field"
          ></textarea>
        </div>

        <div class="action-buttons">
          <button type="button" @click="goBack" class="btn-cancel">取消</button>
          <button type="submit" class="btn-submit" :disabled="!listName.trim()">
            创建歌单
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import tools from '../list.js'

const router = useRouter()
const listName = ref('')
const description = ref('')

const handleSubmit = () => {
  if (!listName.value.trim()) return
  
  // 检查是否已存在同名歌单
  try {
    const currentLists = tools.getAll()
    if (currentLists.some(item => item.name === listName.value)) {
      alert('歌单名称已存在，请换一个名字')
      return
    }

    tools.addList(listName.value, [], description.value)
    
    // 创建成功后的跳转
    console.log('创建歌单成功:', listName.value)
    router.push('/mylist')
  } catch (e) {
    console.error(e)
    alert('创建失败，请重试')
  }
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.add-list-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100%;
  padding-top: 60px;
  background-color: transparent; /* 背景由父组件决定 */
}

.card-container {
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0f0f0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.06);
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
  color: #888;
  font-size: 0.95rem;
  margin: 0;
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

.input-field,
.textarea-field {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #f9f9f9;
  font-size: 1rem;
  color: #333;
  transition: all 0.2s ease;
  font-family: inherit;
  box-sizing: border-box; /* 确保 padding 不会撑破宽度 */
}

.input-field:focus,
.textarea-field:focus {
  outline: none;
  border-color: #fb7299;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(251, 114, 153, 0.1);
}

.input-field::placeholder,
.textarea-field::placeholder {
  color: #bbb;
}

.textarea-field {
  resize: vertical;
  min-height: 100px;
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

.btn-submit:active:not(:disabled) {
  transform: translateY(0);
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
