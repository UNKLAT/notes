style中scoped问题

```html
<template>
  <span class="time-group">

    <span class="time-group__item" v-if="perioable">
      <el-select v-model="timePerio" @change="changeTimePerio" placeholder="请选择时间周期" >
        <el-option
            v-for="item in timePeriodOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>      
    </span>

    <span class="time-group__item">
      <el-date-picker
          v-model="startDate"
          :type="timePerio"
          :placeholder="$t('baseConfigure.pleaseI') + '' + $t('domainManagement.startTime')"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          :disabledDate="disabledDate()"
          popper-class="date-pick-poper"
      >
      </el-date-picker>
    </span>

    <span class="time-group__item">

      <el-date-picker
          v-model="endDate"
          :type="timePerio"
          :placeholder="$t('baseConfigure.pleaseI') + '' + $t('domainManagement.endTime')"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          :disabledDate="disabledDate()"
          popper-class="date-pick-poper"
      >
      </el-date-picker>

    </span>

  </span>
</template>

<script>
import { mapState } from 'vuex'
import { getCorrectDate } from '../utils/utils'
export default {
  name: "TimeGroup",
  props: {
    perioable:{
      type: Boolean,
      default: true,
    },
    perio:{
      type: String,
      default: 'date',
    }
  },

  data(){
    return {

      timePeriodOptions: [

        {
          label: this.$t('time.month'),
          value: 'month',
        },
        {
          label: this.$t('time.date'),
          value: 'date',
        },

        {
          label: this.$t('time.hour'),
          value: 'datetime',
        },
      ],
      timePerio: 'date',
      startDate: '',
      endDate: '',
    }
  },
  computed:{
  ...mapState({
      activeTab: state => state.activeTab,
      aliveTabs: state => state.aliveTabs,
      asideWidth: state => state.asideWidth,
      lang: state => state.lang
    }),
  },

  watch: {
    lang(val){
      console.log(val, 'over lang')

      this.timePeriodOptions = [
        {
          label: this.$t('time.month'),
          value: 'month',
        },
        {
          label: this.$t('time.date'),
          value: 'date',
        },

        {
          label: this.$t('time.hour'),
          value: 'datetime',
        },
      ]


    },
    perio(val){
      console.log(val, 'perio')
      this.timePerio =  val
    }
  },
  mounted(){
    this.timePerio = this.perio
    this.initTime()
    // this.changeTimePerio()
  },
  methods: {

    disabledDate(){
      return (time) => {
        let currentSelectTime = new Date(time).getTime()
        return currentSelectTime > Date.now() 
      }
    },

    initTime() {
      let endTimeMS = new Date().getTime()
      let startTimeMS = endTimeMS - 3 * 24 * 60 * 60 *1000

      this.startDate = getCorrectDate( startTimeMS ).replace(/\//g, '-')
      this.endDate = getCorrectDate( endTimeMS ).replace(/\//g, '-')
      // console.log(this.startDate, this.endDate, 'initTime')

    },

    /**
     * 提供父组件获取该组件选择后的时间
     */
    getTimeValue(){
      return {
        startDate: this.startDate,
        endDate: this.endDate,
      }
    },

    /**
     * 切换时间周期
     * @method changeTimePerio
     * **/
    changeTimePerio(){

      // // let nowDate = new Date().toLocaleDateString().replace(/\//g, '-')
      // let year = new Date().getFullYear()
      // let month = new Date().getMonth() + 1
      // let date = new Date().getDate()
      // if (month < 10) {
      //   month = '0' + month
      // }
      // if (date < 10) {
      //   date = '0' + date
      // }
      // console.log(year, month, date, 'getllllll')
      // let yearDate = year + '-' + month + '-' + date 

      // // let dateArray = nowDate.split('-')
      // let nowTime = new Date().toLocaleTimeString('en-GB')
      // // console.log(nowDate + ' ' + nowTime, '0000') 
      // let startTimeMap = {
      //   // 'month': dateArray[0] + '-01-01',
      //   // 'date': dateArray[0] + '-' + dateArray[1] + '-01',
      //   'month': year + '-01-01',
      //   'date': year + '-' + month + '-01',
      //   'datetime': yearDate
      // }
      // this.startDate =  startTimeMap[this.timePerio]  + ' 00:00'
      // this.endDate = yearDate + ' ' + nowTime.split(':')[0] + ':' + nowTime.split(':')[1]
    },

  }
}
</script>

<style lang="less" >

.time-group__item{
  margin-right: 5px;
}

.date-pick-poper .el-date-picker__time-header{

  .el-input {
    .el-input__inner{
      color: black;
    }   
  }  
}



</style>
```



在上例子中，在style使用scoped的话，.date-pick-poper .el-date-picker__time-header的css是不会挂在到标签上，在浏览器的控制台也看不到