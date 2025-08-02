var view = {
    init: function () {

    },
    datagrid: {
        widthOffset: -210,
        heightOffset: -100,
        columns: [[
            { field: 'chk', title: '选择', width: 50, checkbox: true },
            { field: 'enum_code', title: '枚举编码', width: 140, sortable: false  },
            { field: 'enum_name', title: '枚举名称', width: 140, sortable: false },
            { field: 'enum_desc', title: '枚举说明', width: 200, align: 'center' },
            { field: 'enum_value', title: '枚举值', width: 100, align: 'center' },
            {
                field: 'state', title: '枚举状态', width: 100, align: 'center', sortable: false,
                formatter: function (value, rowData, rowIndex) {
                    return 1 == value ? '启用' : '禁用';
                }
            }
        ]]
    },
    setAdd: function () {
        $('#enum_parent_guid').combobox('setValue', '0');
        $('#enum_value').numberbox('setValue', 0);
    },
    setUpdate: function (rowData) {

    },
    refresh: function () {
        $('#treeS').tree('reload');
        $('#enum_parent_guid').combobox('reload');
    },
    saveDialog: {
        width: 600,
        height: 0
    }
};