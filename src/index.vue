<template>
    <section id="app">
    </section>
</template>

<script>

    export default {
        name: 'app',
        components: {},
        data() {
            return {
                oper:{
                    operation: "操作",
                    check: {
                        isShow: true,
                        title: "查看"
                    }
                }
            }
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        font-size: 16px;
    }
</style>
