## vue
基于vue将一些个人的组件进行封装

## start
`npm install --save czx-myown-icon`

## 引用，在Main.js中
`import CZX from 'czx-myown-icon' `

## 组件调用的时候同vue


## 已经有的组件
##### MyIcon 
###### @receive name size
`//name接收的值前面需带#，size等同于font-size `  
`<MyIcon name="#xxx" size="20"></MyIcon>`


##### TableView 
###### @receive dataList tableHeader tableOperation isTest load

`dataList 是表格的数据，接收数组`  
`tableHeader即是表格的表头，需要自己定义好，也是一个数组`  
`tableOperation 是表格的操作的一些按钮，例如编辑，删除`  
`load 表示是否在数据未获取到之前进行加载动画`
`isTest 表示是否启用测试数据`
`操作里面就写了一个虚拟的删除，具体的得等到删除之后的`  
###### 操作返回的事件
`checkOperation 查看，返回当前的对象数据`  
`editOperation 编辑，返回当前的点击的索引`  
`delOperation 删除，返回挡墙的点击的索引`

