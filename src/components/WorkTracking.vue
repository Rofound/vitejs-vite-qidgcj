<script setup>
import { ref, nextTick } from 'vue';

const tableData = ref(null);
const table = ref(null);

getTableData();
function getTableData() {
  tableData.value = [
    {
      unit: '1',
    },
    {
      unit: '森森森森',
    },
  ];
}

function handleCellStyle({ row, column, rowIndex, columnIndex }) {}
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
      width="120"
      align="center"
      prop="unit"
    ></el-table-column>
    <el-table-column label="内容" align="center"></el-table-column>
    <el-table-column label="计划完成时间" align="center"></el-table-column>
    <el-table-column
      label="本周进度"
      align="center"
    ></el-table-column>
    <el-table-column label="负责人" align="center" prop="finishRate">
    </el-table-column>
  </ElTable>
</template>
<style>
@import './table.css';
</style>
