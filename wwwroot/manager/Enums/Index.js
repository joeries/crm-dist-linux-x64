var view = {
    init: function () {

    },
    datagrid: {
        widthOffset: -210,
        heightOffset: -100,
        columns: [[
            { field: 'chk', title: 'Select', width: 50, checkbox: true },
            { field: 'enum_code', title: 'Code', width: 140, sortable: false  },
            { field: 'enum_name', title: 'Name', width: 140, sortable: false },
            { field: 'enum_desc', title: 'Desc', width: 200, align: 'center' },
            { field: 'enum_value', title: 'Value', width: 100, align: 'center' },
            {
                field: 'state', title: 'State', width: 100, align: 'center', sortable: false,
                formatter: function (value, rowData, rowIndex) {
                    return 1 == value ? 'Enabled' : 'Disabled';
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