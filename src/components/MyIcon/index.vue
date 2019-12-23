<template>
    <svg class="icon" aria-hidden="true" :style="iconSize">
        <use :xlink:href="name"></use>
    </svg>
</template>

<script>
    import "../../../static/myIcon"
    export default {
        name: "MyIcon",
        props: ['name', 'size', 'color'],
        data() {
            return {}
        },
        computed: {
            // iconName:function () {
            //     return '#' + this.name
            // },
            iconSize: function () {
                let iSize = this.size ? 'font-size:' + this.size + 'px;' : '';
                let iColor = this.color ? 'color:' + this.color + ';' : '';
                return iSize + iColor
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        font-size: 16px;
    }
</style>
