var view = {
    init: function () {

    },
    datagrid: {
        heightOffset: -45,
        columns: [[
            { field: 'chk', title: 'Select', width: 50, checkbox: true },
            {
                field: 'img_path', title: 'Image', width: 100, align: 'center', formatter: function (value, rowData, rowIndex) {
                    return '<img src="' + value + '" width="100px" height="100px" />';
                }
            },
            { field: 'img_title', title: 'Title', width: 120 },
            { field: 'img_desc', title: 'Desc', width: 150 },          
            { field: 'img_url', title: 'URL', width: 200 },
            { field: 'img_order', title: 'Order', width: 60, sortable: true, align: 'center' }
        ]]
    },
    setCreate: function () {
        $('#img_order').numberbox('setValue', 0);
    },
    setUpdate: function (rowData) {

    },
    saveDialog: {
        width: 600,
        height: 0
    }
};