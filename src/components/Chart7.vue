<template>
  <div class="dashed-card">
    <BasicArrowHeader title="月度排序（非物业管理单位--降序）" :blockStyle="{width: '97%'}"></BasicArrowHeader>
    <div id="myChart" style="height: calc(100vh - 270px);padding-top: 12px;box-sizing: border-box">

    </div>
  </div>
</template>

<script>
import BasicArrowHeader from "./BasicArrowHeader.vue";
import * as echarts from 'echarts'
import {refreshListen} from "../utils/refreshListen";
export default {
  name: "Chart7",
  components: {BasicArrowHeader},
  async mounted () {
    var dom = this.$el.querySelector('#myChart')

    this.myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });

    await this.refreshData()
    this.refreshClearId = refreshListen(this.refreshData)
  },
  methods: {
    async refreshData() {
      const date = new Date
      const year = date.getFullYear()
      let month = date.getMonth()
      month = month == 0? 1: month
      let res = await fetch(`https://table.cmpo1914.com/p/webapi/request/0Z5jwLh5kaep9/getOtherSafeManagementList?year=${year}&month=${month}`)
      res = await res.json()
      let data = res.data
      this.setOption(data)
    },
    setOption (data) {

      var option;

      const textStyle = {
        color: '#000',
        fontWeight: 'bolder',
        fontSize: 18
      };
      option = {
        title: {
          text: '单位安全管理评估得分',
          left: 'center',
          textStyle: {
            fontSize: 30
          }
        },
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#71a4e1' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#4682db' // 100% 处的颜色
            },
            {
              offset: 1,
              color: '#4682db' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: toSort(getArr()).map(i => i.name),
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            axisLabel: {
              rotate: 45,
              margin: 30,
              padding: [0, -10, 0, 0], // 标签旋转后居中设置
              textStyle
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              lineStyle: {
                color: '#d9d9e9',
                width: 2
              }
            },
            axisLabel: {
              textStyle
            },
            max: 100,
            maxInterval: 5 // 最大间隔
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '40%',
            data: toSort(getArr()),
            label: {
              show: true,
              position: 'top',
              distance: 10,
              textStyle
            }
          }
        ]
      };

      function toFixed(val, size = 2) {
        val = Number(val)
        if (isNaN(val)) {
          val = 0
        }
        return val.toFixed(size)
      }

      function toSort(arr) {
        arr.sort((a, b) => {
          return b.value - a.value
        })
        return arr
      }

      function getArr() {
        return data.map(i => {
          return {
            value: Number(i.score),
            name: i.orgName
          }
        })
        const length = 25
        // return Array.from({ length }, (i) => {
        //   return {
        //     value: toFixed(Math.random() * 100),
        //     name: '江苏公司'
        //   }
        // })
      }

      if (option && typeof option === 'object') {
        this.myChart.setOption(option);
      }

      window.addEventListener('resize', this.myChart.resize);
    }
  },
  beforeRouteLeave () {
    this.myChart.dispose()
    clearInterval(this.refreshClearId)
  }
}
</script>

<style scoped>
.h1 {
  font-size: 34px;
  text-align: center;
  font-weight: 800;
}
.h1-desc {
  font-size: 28px;
  line-height: 1.4;
  font-weight: 800;
}
.h1-desc-before::before {
  content: '';
  display: flex;
  border-radius: 50%;
  background-color: #000;
  width: 15px;
  height: 15px;
  margin-right: 40px;
  margin-top: 12px;
}
.h1-desc-box {
  display: flex;
  flex-direction: row;
  background-color: #eee;
  padding: 15px 20px;
  margin-top: 10px;
}
.dashed-card {
  margin: 10px -8px;
  padding: 8px;
  border: 1px dashed #000;
}
.dashed-card-title {
  background-color: #eee;
  margin-top: 10px;
  font-size: 28px;
  padding-left: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
  font-weight: 800;
}
.dashed-card-desc {
  padding-left: 12px;
  padding-right: 12px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 24px;
}
.row {
  display: flex;
}
.row .col + .col{
  margin-left: 50px;
}
.row .col {
  flex: 1;
}
</style>
