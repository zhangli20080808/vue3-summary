import { createApp } from 'vue'
import App from './App.vue'
import LegoBricksWcc from 'lego-bricks-wcc'
import 'lego-bricks-wcc/dist/bundle.css'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

createApp(App)
  .use(Antd)
  .use(store)
  .use(router)
  .use(LegoBricksWcc)
  .mount('#app')
