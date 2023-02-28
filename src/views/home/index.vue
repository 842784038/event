<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6"
        ><div class="grid-content">
          <em>10015</em><span>篇</span>
          <b>总文章数</b>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content">
          <em>123</em><span>篇</span>
          <b>日新增文章数</b>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content">
          <em>35</em><span>条</span>
          <b>评论总数</b>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content">
          <em>123</em><span>条</span>
          <b>日新增评论数</b>
        </div></el-col
      >
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16"><div class="bg-purple" id="curve_show"></div></el-col>
      <el-col :span="8"><div class="bg-purple" id="pic_show"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="bg-purple-dark" id="column_show">7</div></el-col
      >
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'my-home',
  components: {},
  props: {},
  data () {
    return {}
  },
  watch: {},
  computed: {},
  methods: {
    initCurveFn () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('curve_show'))
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      })
    },
    initPicFn () {
      const chartDom = echarts.init(document.getElementById('pic_show'))
      chartDom.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      })
    },
    initColumnFn () {
      const chartDom = echarts.init(document.getElementById('column_show'))
      chartDom.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
      })
    }
  },
  created () {},
  mounted () {
    // 初始化面积图
    this.initCurveFn()
    // 饼图
    this.initPicFn()
    // 数据集
    this.initColumnFn()
  }
}
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.grid-content {
  position: relative;
  text-align: center;
  border-radius: 4px;
  height: 100px;
  background-color: #fff;
  border: 1px solid #e7e7e9;
  em {
    font-style: normal;
    display: inline-block;
    font-size: 50px;
    margin: 10px 0 0 20px;
    font-family: 'Arial';
    color: #83a2ed;
  }
  span {
    font-size: 14px;
    display: inline-block;
    margin-left: 10px;
    color: #83a2ed;
  }
}
b {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  line-height: 24px;
  background: #e5e5e5;
  color: #333;
  font-size: 14px;
  font-weight: normal;
}
.bg-purple-dark {
  margin-bottom: 20px;
  height: 400px;
  border: 1px solid #e7e7e9;
  background-color: #fff !important;
}
.bg-purple {
  height: 350px;
  border: 1px solid #e7e7e9;
  background-color: #fff !important;
  margin-bottom: 20px;
}
</style>
