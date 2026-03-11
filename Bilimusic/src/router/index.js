import { createRouter, createWebHistory } from 'vue-router'
import Mylist from '../views/mylist.vue'
import Introduction from '../views/introduction.vue'
import Corepage from '../Corepage.vue'
import Recommend from '../views/recommend.vue'
import Register from '../views/register.vue'
import Addlist from '../views/addlist.vue'
import PlaylistDetail from '../views/playlist_detail.vue'
import AddMusic from '../views/addMusic.vue'

const routes = [
  {
    path: '/',
    name: 'Introduction',
    component: Introduction
  },
  {
    path:'/register',
    name:'Register',
    component:Register
  },
  {
    path: '/mylist',
    component: Corepage,
    children:[{
        path:"",
        name: 'Mylist',
        component:Mylist
    }]
  },
  {
    path: '/recommend',
    component: Corepage,
    children:[{
        path:"",
        name: 'Recommend',
        component:Recommend
    }]
  },
  {
    path: '/addlist',
    component: Corepage,
    children:[{
        path:"",
        name: 'Addlist',
        component:Addlist
    }]
  },
  {
    path: '/playlist/:name',
    component: Corepage,
    children: [
      {
        path: '',
        name: 'PlaylistDetail',
        component: PlaylistDetail
      }
    ]
  },
  {
    path: '/addMusic/:name',
    component: Corepage,
    children: [
      {
        path: '',
        name: 'addMusic',
        component: AddMusic
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router