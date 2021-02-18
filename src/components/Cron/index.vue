<template>
  <vcrontab @hide="showCron=false" @fill="crontabFill" :expression="expression"></vcrontab>
</template>

<script>
import vcrontab from "vcrontab";
export default {
  name: "index",
  components: { vcrontab },
  data() {
    return {
      input: "",
      expression: "",
      showCron: false
    };
  },
  methods: {
    crontabFill(value) {
      //确定后回传的值
      console.log('确定后回传的值',value);
    },
    showDialog() {
      this.expression = this.input;//传入的 cron 表达式，可以反解析到 UI 上
      this.showCron = true;
    }
  }
}
</script>

<style scoped>

</style>
