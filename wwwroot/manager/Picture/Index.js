var view = {
    init: function () {

    },
    datagrid: {
        heightOffset: -45,
        columns: [[
            { field: 'chk', title: '选择', width: 50, checkbox: true },
            {
                field: 'img_path', title: '图片', width: 100, align: 'center', formatter: function (value, rowData, rowIndex) {
                    return '<img src="' + value + '" width="100px" height="100px" />';
                }
            },
            { field: 'img_title', title: '标题', width: 120 },
            { field: 'img_desc', title: '说明', width: 150 },          
            { field: 'img_url', title: '链接', width: 200 },
            { field: 'img_order', title: '序号', width: 60, sortable: true, align: 'center' }
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