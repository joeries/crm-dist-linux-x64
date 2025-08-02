var view = {
    init: function () {

    },
    datagrid: {
        heightOffset: -100,
        columns: [[
            { field: 'chk', title: '选择', width: 50, checkbox: true },
            { field: 'ext_table', title: '表名', width: 120, sortable: true , align: 'center'},
            { field: 'ext_type', title: '类型', width: 120, sortable: true, align: 'center' },
            { field: 'ext_code', title: '编码', width: 160, align: 'center' },          
            { field: 'ext_name', title: '名称', width: 180, align: 'center' },
            { field: 'ext_desc', title: '说明', width: 180, align: 'center' },
            { field: 'ext_order', title: '序号', width: 100, align: 'center' },
            {
                field: 'state', title: '状态', width: 60, align: 'center', sortable: true,
                formatter: function (value, rowData, rowIndex) {
                    return 1 == value ? '启用' : '禁用';
                }
            }
        ]]
    },
    setAdd: function () {
        $('#ext_order').numberbox('setValue', 0);
    },
    setUpdate: function (rowData) {

    },
    saveDialog: {
        width: 600,
        height: 0
    }
};