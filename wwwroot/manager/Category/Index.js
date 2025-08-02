var view = {
    init: function () {

    },
    datagrid: {
        widthOffset: -210,
        heightOffset: -100,
        columns: [[
            { field: 'chk', title: '选择', width: 50, checkbox: true },
            { field: 'cat_name', title: '类别名称', width: 200, sortable: false },
            { field: 'cat_desc', title: '类别说明', width: 240, align: 'center' },
            { field: 'cat_order', title: '类别序号', width: 150, align: 'center', sortable: false },
            {
                field: 'state', title: '类别状态', width: 120, align: 'center', sortable: false,
                formatter: function (value, rowData, rowIndex) {
                    return value == 1 ? '启用' : '禁用';
                }
            }
        ]]
    },
    setAdd: function () {
        $('#cat_parent_guid').combobox('setValue', '0');
        $('#cat_order').numberbox('setValue', 0);
    },
    setUpdate: function (rowData) {
        
    },
    refresh: function () {
        $('#treeS').tree('reload');
        $('#cat_parent_guid').combobox('reload');
    },
    saveDialog: {
        width: 600,
        height: 0
    }
};