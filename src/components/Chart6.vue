<template>
  <div class="dashed-card">
    <BasicArrowHeader title="月度排序（前后两位多边形对比图）" :blockStyle="{width: '97%'}"></BasicArrowHeader>
<!--    <div class="h1-desc-box">-->
<!--      <div class="h1-desc-before"></div>-->
<!--      <div class="h1-desc">对比：安全管理基础情况海南公司较弱，周期安全管理情况和安全管理综合评价有提升的空间（安全文化管理未得分）。</div>-->
<!--    </div>-->
    <div class="row">
      <div class="col">
        <div id="myChart" style="height: calc(100vh - 270px);padding-top: 12px;box-sizing: border-box">
        </div>
      </div>
<!--      <div class="col">-->
<!--        <div id="myChart1" style="height: calc(100vh - 350px);padding-top: 12px;box-sizing: border-box">-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import BasicArrowHeader from "./BasicArrowHeader.vue";
import * as echarts from 'echarts'
import {refreshListen} from "../utils/refreshListen";

const map1 = [
  {
    key: 'accidentRate',
    name: '事故指标 '
  },
  {
    key: 'baseRate',
    name: '安全管理基础情况'
  },
  {
    key: 'comprehensiveRate',
    name: '安全管理综合评价'
  },
  {
    key: 'cycleRate',
    name: '周期安全管理情况'
  },
  {
    key: 'evaluateRate',
    name: '项目评价准确性'
  },
  {
    key: 'leaderRate',
    name: '领导履职情况'
  },
  {
    key: 'safeCultureRate',
    name: '安全文化管理创新'
  }
]

export default {
  name: "Chart6",
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
    async refreshData () {
      const date = new Date
      const year = date.getFullYear()
      const month = date.getMonth()
      const orgNames = this.$route.query.orgNames.split(',')
      let res = await fetch(`https://table.cmpo1914.com/p/webapi/request/0Z5jwLh5kaep9/getSafeManagementRateList?year=${year}&month=${month}&orgName=${orgNames[0]}`)
      res = await res.json()
      let data = res.data

      function getOption(orgName, getArr) {
        var option;
        const textStyle = {
          color: '#000',
          fontWeight: 'bolder',
          fontSize: 18
        };
        option = {
          backgroundColor: '#dfeafb',
          tooltip: {},
          title: {
            text: orgName,
            left: 'center',
            textStyle: {
              fontSize: 40,
              lineHeight: 50
            }
          },
          legend: {
            show: false,
            data: ['Allocated Budget', 'Actual Spending']
          },
          radar: {
            center: ['50%', '55%'],
            // shape: 'circle',
            indicator: getArr().map(i=> {
              i.max = 100
              if (i.name.includes('得分百分比')) return i
              i.name = i.name + '\n得分百分比'
              return i
            }),
            splitArea: {
              areaStyle: {
                color: 'transparent'
              }
            },
            splitLine: {
              lineStyle: {
                width: 2,
                color: '#d5deea'
              }
            },
            axisLabel: {
              show: true,
              color: function (value, index) {
                if (!window.obj) {
                  window.obj = {};
                }
                let result = 'transparent';
                if (!window.obj[index]) { // 只显示1列
                  window.obj[index] = true;
                  result = 'black';
                }
                return result;
              },
              fontSize: 18,
              fontWeight: 'bolder',
              formatter: (i) => i + '%'
            },
            axisName: {
              color: '#000',
              fontSize: 18,
              fontWeight: 'bolder'
            },
            axisLine: {
              show: false,
            }
          },
          series: [
            {
              name: 'Budget vs spending',
              type: 'radar',
              symbolSize: 0,
              data: [
                {
                  value: getArr().map(i => i.value),
                  name: orgName,
                  itemStyle: {
                    color: '#6294e4'
                  },
                  lineStyle: {
                    width: 5,
                    shadowColor: '#000',
                    shadowBlur: 8
                  },
                  label: {}
                }
              ]
            }
          ]
        };
        return option
      }

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

      function getArr(item) {
        const result = []
        const keysArr= Object.keys(item)
        keysArr.forEach(key => {
          (key)
          const target = map1.find(i => i.key == key)
          if (!target) return
          target.value = toFixed(item[key] * 100)
          result.push(target)
        })
        return map1
        const length = 25
        // return Array.from({ length }, (i) => {
        //   return {
        //     value: toFixed(Math.random() * 100),
        //     name: '江苏公司'
        //   }
        // })
      }

      this.myChart.setOption(getOption(orgNames[0], () => getArr(data[0])));
      // this.myChart1.setOption(getOption(orgNames[1], () => getArr(data1[0])));


      window.addEventListener('resize', this.myChart.resize);
      // window.addEventListener('resize', this.myChart1.resize);
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
