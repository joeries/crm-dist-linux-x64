var view = {
    init: function () {

    },
    datagrid: {
        heightOffset: -100,
        columns: [[
            { field: 'chk', title: 'Select', width: 50, checkbox: true },
            { field: 'ext_table', title: 'Table Name', width: 120, sortable: true , align: 'center'},
            { field: 'ext_type', title: 'Extension Type', width: 120, sortable: true, align: 'center' },
            { field: 'ext_code', title: 'Extension Code', width: 160, align: 'center' },          
            { field: 'ext_name', title: 'Extension Name', width: 180, align: 'center' },
            { field: 'ext_desc', title: 'Extension Desc', width: 180, align: 'center' },
            { field: 'ext_order', title: 'Order', width: 100, align: 'center' },
            {
                field: 'state', title: 'State', width: 60, align: 'center', sortable: true,
                formatter: function (value, rowData, rowIndex) {
                    return 1 == value ? 'Enabled' : 'Disabled';
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