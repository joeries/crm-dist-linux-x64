var view = {
    init: function () {

    },
    datagrid: {
        widthOffset: -210,
        heightOffset: -100,
        columns: [[
            { field: 'chk', title: 'Select', width: 50, checkbox: true },
            { field: 'cfg_code', title: 'Code', width: 160, sortable: false, align: 'center' },
            { field: 'cfg_name', title: 'Name', width: 160, sortable: false, align: 'center' },
            { field: 'cfg_desc', title: 'Desc', width: 180 },
            { field: 'cfg_value', title: 'Value', width: 240, align: 'center' },
            {
                field: 'state', title: 'State', width: 80, align: 'center', sortable: false,
                formatter: function (value, rowData, rowIndex) {
                    return value == 1 ? 'Enabled' : 'Disabled';
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