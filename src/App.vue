<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import BasicHeader from './components/BasicHeader.vue';
import {computed} from "vue";
import router from "./router";
const isDev = import.meta.env.DEV
console.log(router.options.routes)
const routes = computed(() => {
  return [
      ...router.options.routes
    , {path:'/chart6?slice=6&heightNum=2&radius=130&pageSize=0&widthNum=3',meta: {title: 'x'}}
    , {path:'/chart6?slice=6&heightNum=2&radius=130&pageSize=1&widthNum=3',meta: {title: 'x'}}
    , {path:'/chart6?slice=6&heightNum=2&radius=130&pageSize=2&widthNum=3',meta: {title: 'x'}}
    , {path:'/chart6?slice=6&heightNum=2&radius=130&pageSize=3&widthNum=3',meta: {title: 'x'}}
  ]
})
console.log(routes)
</script>

<template>
  <div class="z-index-max">
    <el-button v-if="isDev" v-for="route in routes" @click="$router.push(route.path)">{{route.path}}</el-button>
  </div>
  <BasicHeader v-if="$route.meta.title" :title="$route.meta.title" />
  <div style="height: 10px" />
  <router-view />
</template>

<style scoped>
</style>

<style>
body {
  padding: 40px;
}
.z-index-max {
  z-index: 999;
  position: fixed;
  top: 10px;
}
</style>
