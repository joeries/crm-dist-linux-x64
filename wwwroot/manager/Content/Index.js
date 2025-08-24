var view = {
    init: function () {
        
    },
    datagrid: {
        widthOffset: -210,
        heightOffset: -100,
        columns: [[
            { field: 'chk', title: 'Select', width: 50, checkbox: true },
            { field: 'content_title', title: 'Title', width: 200 },
            { field: 'mod_name', title: 'Section', width: 100, align: 'center' },
            { field: 'created_by', title: 'Author', width: 100, align: 'center' },
            { field: 'created_time', title: 'Created Time', width: 160, align: 'center' },
            { field: 'content_order', title: 'Order', width: 80, align: 'center' },
            {
                field: 'state', title: 'State', width: 80, align: 'center',
                formatter: function (value, rowData, rowIndex) {
                    return 1 == value ? 'Enabled' : 'Disabled';
                }
            },
        ]]
    },
    setCreate: function () {
        $('#content_order').numberbox('setValue', 0);
    },
    setUpdate: function (rowData) {
    },
    refresh: function () {

    },
    saveDialog: {
        width: 600,
        height: 0
    },
    listTreeExtraParams: 'type=MT:Content'
};