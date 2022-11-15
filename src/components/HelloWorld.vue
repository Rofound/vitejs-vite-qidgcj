<script setup>
import { ref, onMounted, nextTick } from 'vue';
// import { ElTable } from 'element-plus';

defineProps({
  msg: String,
});

const months = getMonths();
const tableData = ref(null);
const table = ref(null);

getTableData();

onMounted(() => {});
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
  <h1>{{ msg }}</h1>

  <ElTable
    ref="table"
    :data="tableData"
    border
    stripe
    :cell-style="handleCellStyle"
  >
    <el-table-column
      label="检查单位"
      width="100"
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
      <el-table-column label="完成整改" width="100" align="center">
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
}
/* 表格列头样式 */
.el-table__header-wrapper .el-table_1_column_1.is-leaf.el-table__cell {
  background-color: #3d83c2;
}
/*表格列头第一行背景颜色及字体颜色*/
table > thead > tr:nth-child(2) {
  color: #000;
  background-color: #ced9ea;
}
/*表格列头第二行背景颜色及字体颜色*/
table > thead > tr:nth-child(1) .el-table__cell {
  color: #fff;
  background-color: #3d83c2 !important;
}
</style>
