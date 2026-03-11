<template>
  <div class="auth-container">
    <div class="background-animation">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>
    
    <div class="auth-box glass">
      <div class="auth-header">
        <h2 @click="isLogin = true" :class="{ active: isLogin }">登录</h2>
        <span class="divider">/</span>
        <h2 @click="isLogin = false" :class="{ active: !isLogin }">注册</h2>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <div class="input-group">
          <label>用户名</label>
          <input type="text" v-model="form.username" placeholder="请输入用户名" required />
        </div>

        <div class="input-group">
          <label>密码</label>
          <input type="password" v-model="form.password" placeholder="请输入密码" required />
        </div>

        <div class="input-group" v-if="!isLogin">
          <label>确认密码</label>
          <input type="password" v-model="form.confirmPassword" placeholder="请再次输入密码" required />
        </div>

        <div class="error-msg" v-if="errorMsg">{{ errorMsg }}</div>

        <button type="submit" class="btn-submit">
          {{ isLogin ? '进入 BiliMusic' : '立即注册' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLogin = ref(true)
const errorMsg = ref('')

const form = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const handleSubmit = () => {
  errorMsg.value = ''
  
  if (isLogin.value) {
    // 模拟登录
    if (form.username && form.password) {
      console.log('Login success:', form.username)
      router.push('/mylist') // 登录成功跳转到我的歌单页
    } else {
      errorMsg.value = '请输入用户名和密码'
    }
  } else {
    // 模拟注册
    if (form.password !== form.confirmPassword) {
      errorMsg.value = '两次输入的密码不一致'
      return
    }
    console.log('Register success:', form.username)
    // 注册成功自动登录
    alert('注册成功！欢迎加入 BiliMusic')
    router.push('/mylist')
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f6f8fb;
  color: #333;
  font-family: 'Inter', -apple-system, system-ui, sans-serif;
  overflow: hidden;
  position: relative;
}

.background-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.15;
  animation: float 10s infinite ease-in-out;
}

.blob-1 {
  width: 500px;
  height: 500px;
  background: #fb7299;
  top: -150px;
  left: -150px;
  animation-delay: 0s;
}

.blob-2 {
  width: 600px;
  height: 600px;
  background: #00a1d6;
  bottom: -200px;
  right: -200px;
  animation-delay: -5s;
}

.blob-3 {
  position: absolute;
  width: 400px;
  height: 400px;
  background: #eef1f5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -2s;
  opacity: 0.5;
}

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}

.auth-box {
  width: 100%;
  max-width: 420px;
  padding: 40px;
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  box-shadow: 0 20px 50px -10px rgba(0,0,0,0.05);
  position: relative;
  z-index: 10;
  transition: transform 0.3s ease;
}

.auth-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  gap: 1.5rem;
}

.auth-header h2 {
  margin: 0;
  cursor: pointer;
  opacity: 0.4;
  transition: all 0.3s;
  font-size: 1.4rem;
  color: #333;
  font-weight: 600;
  padding-bottom: 8px;
  border-bottom: 2px solid transparent;
}

.auth-header h2.active {
  opacity: 1;
  font-weight: 700;
  color: #00a1d6;
  border-bottom-color: #00a1d6;
}

.auth-header .divider {
  opacity: 0.1;
  font-size: 1.4rem;
  color: #333;
}

.input-group {
  margin-bottom: 24px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.95rem;
  color: #666;
  font-weight: 500;
}

.input-group input {
  width: 100%;
  padding: 14px 16px;
  background: #f7f9fc;
  border: 1px solid #e1e4e8;
  border-radius: 10px;
  color: #333;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s;
}

.input-group input:focus {
  background: #fff;
  border-color: #00a1d6;
  box-shadow: 0 0 0 4px rgba(0, 161, 214, 0.1);
}

.input-group input::placeholder {
  color: #ccc;
}

.btn-submit {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #00a1d6, #00b5e5);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
  box-shadow: 0 10px 20px rgba(0, 161, 214, 0.2);
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(0, 161, 214, 0.3);
}

.btn-submit:active {
  transform: translateY(0);
}

.error-msg {
  color: #f25d8e;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  text-align: center;
  background: #fff0f5;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(242, 93, 142, 0.1);
}
</style>