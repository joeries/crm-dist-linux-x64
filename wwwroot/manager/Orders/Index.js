var view = {
    init: function () {
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
    },
    additions: [
        {
            className: 'btnReturn',
            buttonText: '销退',
            handler: function (id, guid, type) {
                $('#orderId').val(id);
                $('#orderQuantity').numberbox('setValue', '0');
                $('#orderAmount').numberbox('setValue', '0');
                $('#dlgReturn').dialog('open');
            },
            pageUrl: null,
            show: function (rowData) {
                return rowData.type.indexOf('R') != 1 && rowData.state >= 1;
            }
        }
    ],
    datagrid: {
        heightOffset: -135,
        columns: [[
            { field: 'chk', title: '选择', width: 50, checkbox: true, align: 'center' },
            {
                field: 'order_type_name', title: '订单类型', width: 150, sortable: false, align: 'left', formatter: function (value, rowData, rowIndex) {
                    return value ? value : '总计';
                }
            },
            { field: 'code', title: '订单号', width: 150, sortable: false, align: 'left' },
            { field: 'store_name', title: '门店名称', width: 150, sortable: false, align: 'left' },
            { field: 'warehouse_name', title: '仓库名称', width: 150, sortable: false, align: 'left' },
            { field: 'product_name', title: '物料名称', width: 150, sortable: false, align: 'left' },
            { field: 'product_model', title: '物料型号', width: 150, sortable: false, align: 'left' },
            { field: 'quantity', title: '物料数量', width: 100, sortable: false, align: 'left' },
            { field: 'amount', title: '订单金额', width: 100, sortable: false, align: 'left' },
            { field: 'created_time', title: '下单/退单时间', width: 130, sortable: false, align: 'left' },
            { field: 'shipment_time', title: '发货/退货时间', width: 130, sortable: false, align: 'left' },  
            { field: 'fullname', title: '姓名', width: 150, sortable: false, align: 'left' },
            { field: 'mobile', title: '手机号码', width: 150, sortable: false, align: 'left' },
            { field: 'addr', title: '地址', width: 150, sortable: false, align: 'left' },
            { field: 'import_tip', title: '录入说明', width: 150, sortable: false, align: 'left' },
            {
                field: 'state', title: '订单状态', width: 80, align: 'center', sortable: false, formatter: function (value, rowData, rowIndex) {
                    if (rowData.type.indexOf('R') == 1) {
                        if (value == 0) return '待退货';
                        if (value == 1) return '已退货，待上传';
                        if (value == 2) return '已退货，已上传';
                        return "";
                    }
                    else {
                        if (value == 0) return '待发货';
                        if (value == 1) return '已发货，待上传';
                        if (value == 2) return '已发货，已上传';
                        return "";
                    }
                }
            }  
        ]]
    },
    setCreate: function () {
        $('#code').removeAttr('readonly');
        $('#quantity').numberbox('setValue', 1);
        $('#amount').numberbox('setValue', 0);
    },
    setUpdate: function (rowData) {
        $('#code').attr('readonly', 'readonly');
    },
    refresh: function () {

    },
    saveDialog: {
        width: 600,
        height: 0
    }
};