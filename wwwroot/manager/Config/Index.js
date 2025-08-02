var view = {
    init: function () {

    },
    datagrid: {
        widthOffset: -210,
        heightOffset: -100,
        columns: [[
            { field: 'chk', title: '选择', width: 50, checkbox: true },
            { field: 'cfg_code', title: '配置编码', width: 160, sortable: false, align: 'center' },
            { field: 'cfg_name', title: '配置名称', width: 160, sortable: false, align: 'center' },
            { field: 'cfg_desc', title: '配置说明', width: 180 },
            { field: 'cfg_value', title: '配置值', width: 240, align: 'center' },
            {
                field: 'state', title: '配置状态', width: 80, align: 'center', sortable: false,
                formatter: function (value, rowData, rowIndex) {
                    return value == 1 ? '启用' : '禁用';
                }
            }
        ]]
    },
    setCreate: function () {
        $('#cfg_parent_guid').combobox('setValue', '');
        $('#enum_code_data_type').combobox('setValue', 'string');
    },
    setUpdate: function (rowData) {

    },
    refresh: function () {
        $('#treeS').tree('reload');
        $('#cfg_parent_guid').combobox('reload');
    },
    saveDialog: {
        width: 600,
        height: 0
    }
};