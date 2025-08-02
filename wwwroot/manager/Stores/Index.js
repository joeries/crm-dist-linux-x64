var view = {
    init: function () {

    },
    additions: [

    ],
    datagrid: {
        heightOffset: -100,
        columns: [[
            { field: 'chk', title: '选择', width: 50, checkbox: true, align: 'center' },
            { field: 'identification', title: '唯一标识', width: 150, sortable: false, align: 'left' },
            { field: 'code', title: '门店编码', width: 150, sortable: false, align: 'left' },
            { field: 'name', title: '门店名称', width: 150, sortable: false, align: 'left' },
            {
                field: 'state', title: '门店状态', width: 80, align: 'center', sortable: false, formatter: function (value, rowData, rowIndex) {
                    return value == 1 ? '启用' : '禁用';
                }
            }            
        ]]
    },
    setCreate: function () {
        $('#identification').removeAttr('readonly');
        $('#code').removeAttr('readonly');
    },
    setUpdate: function (rowData) {
        $('#identification').attr('readonly', 'readonly');
        $('#code').attr('readonly', 'readonly');
    },
    refresh: function () {

    },
    saveDialog: {
        width: 600,
        height: 0
    }
};