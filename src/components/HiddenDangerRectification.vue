<script setup>
import { ref, nextTick } from 'vue';
import Axios from "axios";
import dlv from "dlv";

const monthsLabel = getMonthsLabel();
const tableData = ref(null);
const table = ref(null); // ref

getTableData();

function getMonthsLabel() {
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
async function getTableData() {
  const params = {
    key: "0Zb288be183072479ab06f229075cd5c49", //API Key
    request: JSON.stringify({
      "conditionList": [{pageSize: -1,}],
      useFieldAliasName: true
    })
  }
  const res = await Axios({
    url: "https://table.cmpo1914.com/p/webapi/table_query/0Z5j5jW9bqKSfNs", // https://table.cmpo1914.com/p/webapi/table_query/{{tableId}}
    params: params
  })
  tableData.value = dlv(res, 'data.result.recordList', []);
}

function handleCellStyle({ row, column, rowIndex, columnIndex }) {
  if (column.property === 'okRate') {
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
        v-for="(month, index) in monthsLabel"
        :label="month"
        :prop="'month'+ (index+1)"
        align="center"
      ></el-table-column>
    </el-table-column>
    <el-table-column label="总计" align="center">
      <el-table-column label="总计" align="center" prop="total"></el-table-column>
      <el-table-column label="完成整改" width="120" align="center" prop="ok">
      </el-table-column>
      <el-table-column
        label="整改率"
        align="center"
        prop="okRate"
        :formatter="formatterFinishRate"
      >
      </el-table-column>
    </el-table-column>
  </ElTable>
</template>

<style>
@import './table.css';
</style>
