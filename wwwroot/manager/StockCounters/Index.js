var view = {
    init: function () {

    },
    additions: [

    ],
    datagrid: {
        heightOffset: -100,
        columns: [[
            { field: 'chk', title: '选择', width: 50, checkbox: true, align: 'center' },
            { field: 'stock_type_name', title: '库存类型', width: 150, sortable: false, align: 'left' },
            { field: 'warehouse_name', title: '仓库名称', width: 150, sortable: false, align: 'left' },
            { field: 'product_name', title: '物料名称', width: 150, sortable: false, align: 'left' },
            { field: 'product_model', title: '物料型号', width: 150, sortable: false, align: 'left' },
            { field: 'dom', title: '入库日期', width: 150, sortable: false, align: 'left' },
            { field: 'age_days', title: '库龄（天）', width: 100, sortable: false, align: 'center' },
            { field: 'quantity', title: '总库存', width: 150, sortable: true, align: 'left' },
            { field: 'sold', title: '总销量', width: 150, sortable: true, align: 'left' },
            {
                field: 'left', title: '剩余库存', width: 150, sortable: true, align: 'left', formatter: function (value, rowData, rowIndex) {
                    return rowData.quantity - rowData.sold;
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