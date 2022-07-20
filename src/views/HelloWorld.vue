<template>
  <div class="container">
    <div id="myChart" :style="{ width: '600px', height: '260px' }" />
    <Row>
      <div></div>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'Hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    Foo(name, data) {
      const map = new Map([['加工', '#41FD2D'], ['待机', '#FDFB00'], ['离线', '#ADCDDC'], ['故障', '#FD2222']])

      return {
        name: name,
        data: data,
        type: 'bar',
        stack: 'total',
        barWidth: 50,
        itemStyle: {
          color: map.get(name)
        }
      }
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      var seriesList = []
      seriesList.push(this.Foo('故障', [3.0]))
      seriesList.push(this.Foo('待机', [1.5]))
      seriesList.push(this.Foo('加工', [2.5]))
      seriesList.push(this.Foo('故障', [1.5]))
      seriesList.push(this.Foo('离线', [6.5]))
      seriesList.push(this.Foo('离线', [2.5]))
      console.log(seriesList)
      var option = {
        legend: {
          data: ['加工', '待机', '故障', '离线'],
          bottom: 10,
          left: 20,
          itemGap: 15,
          formatter: function(name) {
            var arr = seriesList.filter(item => item.name === name)
            var total =
              arr.reduce((acc, cur) => {
                return acc + cur.data[0]
              }, 0) * 60
            var hours = Math.floor(total / 60)
            var minutes = Math.floor(total % 60)
            return `${name} ${hours}h ${minutes}min`
          }
        },
        grid: {
          left: 10,
          right: '4%',
          bottom: '30%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          // 开始时间
          min: 0.0,
          // 结束时间
          max: 24.0,
          // 分隔
          interval: 6,
          // x轴线显示
          axisLine: {
            show: true
          },
          // x轴刻度
          axisTick: {
            show: true,
            inside: true // 坐标轴刻度是否朝内
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#000',
              fontSize: 12
            }
          }
        },
        yAxis: {
          type: 'category'
        },
        series: seriesList
      }
      // 绘制图表
      myChart.setOption(option)
    }
  }
}
</script>
<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  margin-top: 5%;
}
</style>
