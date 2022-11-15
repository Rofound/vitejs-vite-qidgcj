<script setup>
import { ref, nextTick } from 'vue';

const tableData = ref(null);
const table = ref(null);

getTableData();

function getTableData() {
  tableData.value = [
    {
      unit: '森森森森',
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
      width="100"
      align="center"
    ></el-table-column>
    <el-table-column label="负责人" align="center" prop="finishRate">
    </el-table-column>
  </ElTable>
</template>

<style scoped>
.el-table {
  /*表格边框颜色*/
  --el-border-color-lighter: #fff;
  /*表格斑马玟颜色*/
  --el-fill-color-lighter: #ced9ea;
  /*表格行颜色*/
  --el-table-tr-bg-color: #e8edf6;
  /*表格文字颜色*/
  --el-table-text-color: #000;
  /*表格头第二行颜色*/
  --el-fill-color-light: #ced9ea;
}
</style>
<style>
/*清除table 行hover效果*/
/* https://blog.csdn.net/m0_50914413/article/details/119108225 */
.el-table tr {
  pointer-events: none;
  letter-spacing: 2px;
}
/* 表格列头样式 */
.el-table__header-wrapper .el-table_1_column_1.is-leaf.el-table__cell {
  background-color: #3d83c2;
}
/*表格列头第二行背景颜色及字体颜色*/
table > thead > tr:nth-child(2) {
  color: #000;
  background-color: #ced9ea;
  height: 80px;
}
/*表格列头第一行背景颜色及字体颜色*/
table > thead > tr:nth-child(1) .el-table__cell {
  height: 80px;
  color: #fff;
  background-color: #3d83c2 !important;
}
</style>
