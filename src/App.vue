<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import BasicHeader from './components/BasicHeader.vue';
</script>

<template>
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
