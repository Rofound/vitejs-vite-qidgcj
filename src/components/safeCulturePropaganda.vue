<script setup>
import {ref} from 'vue';
import Axios from "axios";
import dlv from 'dlv'
import {refreshListen} from "../utils/refreshListen";

const img = ref(null);

getTableData();

refreshListen(() => {
  getTableData()
})

async function getTableData () {
  const params = {
    key: "0Zb288be183072479ab06f229075cd5c49", //API Key
    request: JSON.stringify({
      "conditionList": [{pageSize: -1,}],
      useFieldAliasName: true
    })
  }
  const res = await Axios({
    url: "https://table.cmpo1914.com/p/webapi/table_query/0Z5j5j14Uk2jtxSI", // https://table.cmpo1914.com/p/webapi/table_query/{{tableId}}
    params: params
  })
  const arr = dlv(res, 'data.result.recordList', [])
  const target = arr.find(i => i.online == '上线') || {}
  const result = 'https://table.cmpo1914.com/file/' + dlv(target, 'file.0.id')
  if (JSON.stringify(img.value) == JSON.stringify(result)) return
  img.value = result
}

</script>

<template>
  <div>
    <img class="fullScreen" :src="img" alt="">
  </div>
</template>

<style scoped>
.fullScreen {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
