<template>
  <div class="dashed-card">
    <BasicArrowHeader title="月度排序（多边形对比图）" :blockStyle="{width: '97%'}"></BasicArrowHeader>
<!--    <div class="h1-desc-box">-->
<!--      <div class="h1-desc-before"></div>-->
<!--      <div class="h1-desc">对比：安全管理基础情况海南公司较弱，周期安全管理情况和安全管理综合评价有提升的空间（安全文化管理未得分）。</div>-->
<!--    </div>-->
    <div class="chart6-row">
      <div class="chart6-col" v-for="(a, index) in arr" :style="{width: calcWidth}" style="flex:unset">
        <div :id="'myChart' + index" :style="{height: calcHeight}" style="padding-top: 12px;box-sizing: border-box">
        </div>

        <div class="chart6-abs">排名: 第{{(slice*pageSize) + index + 1}}名</div>
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
  // {
  //   key: 'safeCultureRate',
  //   name: '安全文化管理创新'
  // }
]

export default {
  name: "Chart6",
  components: {BasicArrowHeader},
  data () {
    const _citys = this.$route.query.orgNames && this.$route.query.orgNames.split(',')
    const pageNo = this.$route.query.pageNo || 1
    const pageSize = this.$route.query.pageSize == undefined? 15: this.$route.query.pageSize
    const slice = this.$route.query.slice == undefined? 15: this.$route.query.slice
    return {
      city: _citys || ['上海公司', '东北公司', '中原公司', '佛山公司', '北京公司', '协同事业部', '四川公司', '天津公司', '安徽公司', '山东公司', '广州公司', '江苏公司', '江西公司', '浙江公司', '海南公司', '深圳公司', '湖北公司', '湖南公司', '福建公司', '积余南航', '积余新中', '积余汇勤', '积余设施', '重庆公司', '高校服务'],
      cacheData: {},
      arr: [],
      pageSize: Number(pageSize),
      slice: Number(slice)
    }
  },
  async mounted () {
    let pageSize = Number(this.pageSize)
    let arr = await this.getData()
    let slice = Number(this.$route.query.slice)
    let customSlice = Number(this.$route.query.customSlice)
    if (customSlice) {
      arr = arr.slice(0 + (pageSize * slice), (pageSize * slice) + customSlice)
    } else {
      arr = arr.slice(0 + (pageSize * slice), (pageSize * slice) + slice)
    }


    this.arr = arr
    await this.$nextTick()
    arr.map(async (item, index) => {
      var dom = this.$el.querySelector('#myChart' + index)
      this['myChart' + index] = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });
      await this.refreshData([item.orgName], index, [item])


    })

    this.refreshClearId = refreshListen(async () => {
      if (JSON.stringify(this.cacheData) !== JSON.stringify(await this.getData())) {
        location.reload()
      }
    })

    // this.refreshClearId = refreshListen(this.refreshData)
    window.addEventListener('resize', () => {
      location.reload()
    });
  },
  methods: {
    async getData(orgName = '') {
      const date = new Date
      const year = date.getFullYear()
      let month = date.getMonth()
      month = month == 0? 1: month
      // const orgNames = this.$route.query.orgNames.split(',')
      this.year = year
      this.month = month
      let res = await fetch(`https://table.cmpo1914.com/p/webapi/request/0Z5jwLh5kaep9/getSafeManagementRateList?year=${this.year}&month=${this.month}&orgName=${orgName}`)
      res = await res.json()
      let data = res.data
      this.cacheData = data
      return data
    },
    async refreshData (orgNames, index, data) {
      return new Promise(async r => {
        const myChart = this['myChart' + index]


        const fontSize= 12

        if (!this.refreshData['myChart' + index]) {
          this.refreshData['myChart' + index] = true
          myChart.setOption({
            backgroundColor: '#dfeafb',
            tooltip: {},
            title: {
              text: orgNames[0],
              left: 'center',
              textStyle: {
                fontSize: 23,
                lineHeight: 50
              }
            },
            legend: {
              show: false,
              data: ['Allocated Budget', 'Actual Spending']
            },
          })
        }
        const _this = this
        function getOption(orgName, getArr, _index) {
          var option;

          option = {
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
                  if (!window.obj[_index]) {
                    window.obj[_index] = {};
                  }
                  let result = 'transparent';
                  if (!window.obj[_index][index]) { // 只显示1列
                    window.obj[_index][index] = true;
                    result = 'black';
                  }
                  return result;
                },
                fontSize: fontSize,
                fontWeight: 'bolder',
                formatter: (i) => i + '%'
              },
              axisName: {
                color: '#000',
                fontSize: fontSize,
                fontWeight: 'bolder'
              },
              axisLine: {
                show: false,
              },
              radius: _this.$route.query.radius||60
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
                      color: '#6294e4',
                      fontSize: 12
                    },
                    lineStyle: {
                      width: 3,
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

        function getArr(item = data[0]) {
          const result = []
          const keysArr= Object.keys(item)
          keysArr.forEach(key => {
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

        myChart.setOption(getOption(orgNames[0], () => getArr(data[0]), index));
        // this.myChart1.setOption(getOption(orgNames[1], () => getArr(data1[0])));



        // window.addEventListener('resize', this.myChart1.resize);
        r()
      })
    }
  },
  beforeRouteLeave () {

    this.city.forEach((in1, index) => {
      this['myChart' + index] && this['myChart' + index].dispose()
    })

    clearInterval(this.refreshClearId)
  },
  computed: {
    calcWidth (newValue, oldValue) {
      // return '350px'
      return `calc((100vw - 100px) / ${this.$route.query.widthNum || 3} - 20px)`
    },
    calcHeight(newValue, oldValue) {
      // return '280px'
      return `calc((100vh - 200px) / ${this.$route.query.heightNum || 2} - 10px)`
    }
  },
  watch: {
    $route() {
      location.reload()
    }
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
.chart6-abs {
  position: absolute;
  top: 20px;
  left: 15px;
}
.chart6-row {
  display: flex;

  flex-wrap: wrap;
}
.chart6-col {
  position: relative;
  margin-left: 10px;
}
.chart6-row .chart6-col + .chart6-col{
  /*margin-left: 10px;*/
}
.chart6-row .chart6-col {
  flex: 1;
}
</style>
