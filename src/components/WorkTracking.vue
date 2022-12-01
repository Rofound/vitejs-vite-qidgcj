<script setup>
import {ref, nextTick} from 'vue';
import Axios from "axios";
import dlv from 'dlv'

const tableData = ref(null);
const table = ref(null);

getTableData();

async function getTableData () {
  const params = {
    key: "0Zb288be183072479ab06f229075cd5c49", //API Key
    request: JSON.stringify({
      "conditionList": [{pageSize: -1,}],
      useFieldAliasName: true
    })
  }
  const res = await Axios({
    url: "https://table.cmpo1914.com/p/webapi/table_query/0Z5j5jWdxr7FJPz", // https://table.cmpo1914.com/p/webapi/table_query/{{tableId}}
    params: params
  })
  tableData.value = dlv(res, 'data.result.recordList', [])
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
                     prop="content"></el-table-column>
    <el-table-column label="计划完成时间" align="center"
                     prop="finishTime"></el-table-column>
    <el-table-column
        label="本周进度"
        align="center"
        prop="weekProgress"
    ></el-table-column>
    <el-table-column label="负责人" align="center" prop="owner">
    </el-table-column>
  </ElTable>
</template>
<style>
@import './table.css';
</style>
