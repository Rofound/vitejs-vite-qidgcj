<script setup>
import { ref, nextTick } from 'vue';

const months = getMonths();
const tableData = ref(null);
const table = ref(null);

getTableData();

function getMonths() {
  const monthsForChinese = [
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十',
    '十一',
    '十二',
  ];
  const months = Array.from({ length: 12 }, (udf, index) => {
    const month = monthsForChinese[index];
    return month + '月';
  });
  return months;
}
function getTableData() {
  tableData.value = [
    {
      unit: '森森森森',
      一月: '1',
      二月: '2',
      三月: '2',
      四月: '2',
      五月: '2',
      六月: '2',
      七月: '2',
      八月: '2',
      九月: '2',
      十月: '2',
      十一月: '2',
      十二月: '2',
      finishRate: 100,
    },
    {
      unit: '森森森森',
      一月: '1',
      二月: '2',
      三月: '2',
      四月: '2',
      五月: '2',
      六月: '2',
      七月: '2',
      八月: '2',
      九月: '2',
      十月: '2',
      十一月: '2',
      十二月: '2',
      finishRate: 98,
    },
  ];
}

function handleCellStyle({ row, column, rowIndex, columnIndex }) {
  if (column.property === 'finishRate') {
    // 处理整改率字体颜色
    if (row[column.property] < 100) {
      return {
        color: 'red',
      };
    }
  }
}

function formatterFinishRate(row, column, cellValue, index) {
  return cellValue + '%';
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
      label="检查单位"
      width="150"
      align="center"
      prop="unit"
    ></el-table-column>
    <el-table-column label="月度" align="center">
      <el-table-column
        v-for="month in months"
        :label="month"
        :prop="month"
        align="center"
      ></el-table-column>
    </el-table-column>
    <el-table-column label="总计" align="center">
      <el-table-column label="总计" align="center"></el-table-column>
      <el-table-column label="完成整改" width="120" align="center">
      </el-table-column>
      <el-table-column
        label="整改率"
        align="center"
        prop="finishRate"
        :formatter="formatterFinishRate"
      >
      </el-table-column>
    </el-table-column>
  </ElTable>
</template>

<style>
@import './table.css';
</style>
