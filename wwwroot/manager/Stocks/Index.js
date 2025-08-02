var view = {
    init: function () {
        $('#btnSwitch').click(function () {
            $('#dlgSwitch').dialog('open');
        });

        $('#cat_guid').combobox({
            onChange: function (newValue, oldValue) {
                var request = {
                    apiName: 'Manager/Products/ListCombobox',
                    catGuid: newValue
                };
                api.post(request, function (request, response) {
                    if (response.code != 'OK') return;
                    $('#product_guid').combobox('loadData', response.body);
                });
            }
        });

        $('#catGuid').combobox({
            onChange: function (newValue, oldValue) {
                var request = {
                    apiName: 'Manager/Products/ListCombobox',
                    catGuid: newValue
                };
                api.post(request, function (request, response) {
                    if (response.code != 'OK') return;
                    $('#productGuid').combobox('loadData', response.body);
                });
            }
        });
    },
    additions: [

    ],
    datagrid: {
        heightOffset: -100,
        columns: [[
            { field: 'chk', title: '选择', width: 50, checkbox: true, align: 'center' },
            { field: 'batch_no', title: '批次号', width: 150, sortable: false, align: 'left' },
            { field: 'stock_type_name', title: '库存类型', width: 150, sortable: false, align: 'left' },
            { field: 'warehouse_name', title: '仓库名称', width: 150, sortable: false, align: 'left' },
            { field: 'product_name', title: '物料名称', width: 150, sortable: false, align: 'left' },
            { field: 'product_model', title: '物料型号', width: 150, sortable: false, align: 'left' },
            { field: 'dom', title: '入库日期', width: 150, sortable: false, align: 'left' },
            { field: 'age_days', title: '库龄（天）', width: 100, sortable: false, align: 'center' },
            { field: 'quantity', title: '初始库存', width: 150, sortable: true, align: 'left' },
            { field: 'sold', title: '已售库存', width: 150, sortable: true, align: 'left' },
            {
                field: 'left', title: '剩余库存', width: 150, sortable: true, align: 'left', formatter: function (value, rowData, rowIndex) {
                    return rowData.quantity - rowData.sold;
                }
            }
        ]]
    },
    setCreate: function () {
        $('#batch_no').removeAttr('readonly');
        $('#warehouse_guid').combobox('setValue', '00000000-0000-0000-0000-000000000000');
        $('#warehouse_guid').combobox('disable');
        $('#quantity').numberbox('setValue', 1);
    },
    setUpdate: function (rowData) {
        $('#batch_no').attr('readonly', 'readonly');
        $('#warehouse_guid').combobox('disable');
        $('#dom').attr('readonly', 'readonly');
        $('#type').combobox('disable');
        $('#product_guid').combobox('disable');
        $('#quantity').numberbox('disable');
    },
    refresh: function () {

    },
    saveDialog: {
        width: 600,
        height: 0
    },
    showUpdateUI: false
};