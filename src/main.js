import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/index.css'

createApp(App).use(VueVirtualScroller).mount('#app')
