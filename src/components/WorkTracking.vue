<script setup>
import {ref, nextTick} from 'vue';
import Axios from "axios";
import dlv from 'dlv'
import {refreshListen} from "../utils/refreshListen";

const tableData = ref(null);
const table = ref(null);

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
    url: "https://table.cmpo1914.com/p/webapi/table_query/0Z5j5j1jG7bz3cDv", // https://table.cmpo1914.com/p/webapi/table_query/{{tableId}}
    params: params
  })
  const result = dlv(res, 'data.result.recordList', [])
  if (JSON.stringify(tableData.value) == JSON.stringify(result)) return
  tableData.value = result
}

function handleCellStyle ({row, column, rowIndex, columnIndex}) {
}
</script>

<template>
  <ElTable
      ref="table"
      :data="tableData"
      border
      stripe
      :cell-style="handleCellStyle"
  >
    <el-table-column
        label="项目"
        width="170"
        align="center"
        prop="projectName"
    ></el-table-column>
    <el-table-column label="内容" align="center"
                     prop="content">
      <template #default="{row}">
        <div style="text-align: center">
          <div v-html="row.content" style="display: inline-block;text-align: left"></div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="计划完成时间" align="center"
                     prop="finishTime"></el-table-column>
    <el-table-column
        label="本周进度"
        align="center"
        prop="weekProgress"
    ><template #default="{row}">
      <div style="text-align: center">
        <div v-html="row.weekProgress" style="display: inline-block;text-align: left"></div>
      </div>
    </template></el-table-column>
    <el-table-column label="负责人" align="center" prop="owner">
    </el-table-column>
  </ElTable>
</template>
<style>
@import './table.css';
</style>
