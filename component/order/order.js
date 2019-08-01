// component/order/order.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        src: {
            type: String,
            value: ""
        },
        name: {
            type: String,
            value: ""
        },
        state: {
            type: String,
            value: ''
        },
        time: {
            type: String,
            value: ''
        },
        price: {
            type: String,
            value: "0.00"
        },
        unit: {
            type: String,
            value: "包"
        },
        num: {
            type: Number,
            value: 1
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})