<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import BasicHeader from './components/BasicHeader.vue';
const isDev = import.meta.env.DEV
</script>

<template>
  <el-button v-if="isDev" v-for="route in $router.options.routes" @click="$router.replace(route.path)">{{route.path}}</el-button>
  <BasicHeader :title="$route.meta.title" />
  <div style="height: 10px" />
  <router-view />
</template>

<style scoped>
</style>

<style>
body {
  padding: 40px;
}
</style>
