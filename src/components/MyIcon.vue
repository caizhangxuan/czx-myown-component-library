<template>
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="name"></use>
    </svg>
</template>

<script>
  export default {
    name: "MyIcon",
    props: ['name','size'],
    data() {
      return{

      }
    },
    mounted(){

    }
  }
</script>

<style scoped>

</style>
