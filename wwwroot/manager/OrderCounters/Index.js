var view = {
    init: function () {

    },
    additions: [

    ],
    datagrid: {
        heightOffset: -135,
        columns: [[
            { field: 'chk', title: '选择', width: 50, checkbox: true, align: 'center' },
            {
                field: 'created_date', title: '销售日期', width: 150, sortable: false, align: 'left', formatter: function (value, rowData, rowIndex) {
                    return value ? value : '总计';
                }
            },
            { field: 'order_type_name', title: '订单类型', width: 150, sortable: false, align: 'left' },
            { field: 'store_name', title: '门店名称', width: 150, sortable: false, align: 'left' },
            { field: 'warehouse_name', title: '仓库名称', width: 150, sortable: false, align: 'left' },
            { field: 'product_name', title: '物料名称', width: 150, sortable: false, align: 'left' },
            { field: 'product_model', title: '物料型号', width: 150, sortable: false, align: 'left' },
            { field: 'quantity', title: '物料数量', width: 100, sortable: false, align: 'left' },
            { field: 'amount', title: '订单金额', width: 100, sortable: false, align: 'left' },      
            {
                field: 'state', title: '订单状态', width: 80, align: 'center', sortable: false, formatter: function (value, rowData, rowIndex) {
                    if (rowData.type.indexOf('R') == 1) {
                        if (value == 0) return '待退货';
                        if (value == 1) return '已退货，待上传';
                        if (value == 2) return '已退货，已上传';
                        return "";
                    }
                    else {
                        if (value == 0) return '待发货';
                        if (value == 1) return '已发货，待上传';
                        if (value == 2) return '已发货，已上传';
                        return "";
                    }
                }
            }  
        ]]
    },
    setCreate: function () {

    },
    setUpdate: function (rowData) {

    },
    refresh: function () {

    },
    saveDialog: {
        width: 600,
        height: 0
    },
    showUpdateUI: false
};