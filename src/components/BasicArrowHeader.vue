<script setup>
defineProps({
  title: String,
  blockStyle: Object
});
</script>

<template>
  <div class="basic-arrow-header">
    <div class="bg-block" :style="blockStyle">
      <div class="block" ></div>
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<style  scoped>
span {
  position: relative;
  color: #fff;
  font-size: 30px;
  letter-spacing: 6px;
  text-indent: 6px;
}
img {
  position: absolute;
  left: 0px;
  top: 0;
  height: 110%;
}
.basic-arrow-header {
  position: relative;
  height: 60px;

  display: flex;
  align-items: center;
}
.bg-block {
  position: absolute;
  display: flex;
  background-color: #3d83c2;
  box-shadow: -2px 1px 14px 0px rgb(0 0 0 / 41%);
}
.bg-block .block {
  background-color: #3d83c2;
  height: 50px;
  width: 800px;
}
.bg-block .block::after {
  content: '';
  width: 0px;
  height: 0px;
  border: 25px solid #3d83c2;
  border-bottom-color: transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  border-right-color: transparent;
  z-index: 0;
  position: absolute;
  right: -50px;
}
.title {
  width: 100%;
  z-index: 111;
  font-size: 28px;
  color: #fff;
  text-align: center;
  font-weight: 800;
}
</style>
<style></style>
