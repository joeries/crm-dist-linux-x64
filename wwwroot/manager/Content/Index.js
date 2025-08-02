var view = {
    init: function () {
        
    },
    datagrid: {
        widthOffset: -210,
        heightOffset: -100,
        columns: [[
            { field: 'chk', title: '选择', width: 50, checkbox: true },
            { field: 'content_title', title: '标题', width: 200 },
            { field: 'mod_name', title: '栏目', width: 100, align: 'center' },
            { field: 'created_by', title: '发布人', width: 100, align: 'center' },
            { field: 'created_time', title: '发布时间', width: 160, align: 'center' },
            { field: 'content_order', title: '序号', width: 80, align: 'center' },
            {
                field: 'state', title: '状态', width: 80, align: 'center',
                formatter: function (value, rowData, rowIndex) {
                    return 1 == value ? '启用' : '禁用';
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