import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import AddMusicView from '../views/AddMusicView.vue'
import AuthView from '../views/AuthView.vue'
import CreatePlaylistView from '../views/CreatePlaylistView.vue'
import HomeView from '../views/HomeView.vue'
import MyPlaylistsView from '../views/MyPlaylistsView.vue'
import PlaylistDetailView from '../views/PlaylistDetailView.vue'
import RecommendView from '../views/RecommendView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/register',
    name: 'auth',
    component: AuthView,
  },
  {
    path: '/mylist',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'myPlaylists',
        component: MyPlaylistsView,
      },
    ],
  },
  {
    path: '/recommend',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'recommend',
        component: RecommendView,
      },
    ],
  },
  {
    path: '/addlist',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'createPlaylist',
        component: CreatePlaylistView,
      },
    ],
  },
  {
    path: '/playlist/:name',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'playlistDetail',
        component: PlaylistDetailView,
      },
    ],
  },
  {
    path: '/addMusic/:name',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'addMusic',
        component: AddMusicView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
