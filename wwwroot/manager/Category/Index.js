var view = {
    init: function () {

    },
    datagrid: {
        widthOffset: -210,
        heightOffset: -100,
        columns: [[
            { field: 'chk', title: 'Select', width: 50, checkbox: true },
            { field: 'cat_name', title: 'Name', width: 200, sortable: false },
            { field: 'cat_desc', title: 'Desc', width: 240, align: 'center' },
            { field: 'cat_order', title: 'Order', width: 150, align: 'center', sortable: false },
            {
                field: 'state', title: 'State', width: 120, align: 'center', sortable: false,
                formatter: function (value, rowData, rowIndex) {
                    return value == 1 ? 'Enabled' : 'Disabled';
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