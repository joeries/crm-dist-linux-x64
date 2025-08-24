$(function () {
    //当前选中角色
    var row = null;

    //当前角色权限列表
    var gPowers = [];
    var arrayDel = [];
    var arrayAdd = [];

    var showModulePower = function (moduleGuid, roleGuid) {
        var request = {
            apiName: 'Manager/Power/List',
            moduleGuid: moduleGuid,
            roleGuid: roleGuid
        };
        api.post(request, function (request, response) {
            $('#dgPower').datagrid('loadData', response.body);
        }, null, null, null, false);
    };

    //显示修改UI
    var showUpdate = function (rowData) {
        $('#formSave').form('load', rowData);
        $('#btnCancel').linkbutton('enable');
        $('#btnAdd').linkbutton('disable');
        $('#btnUpdate').linkbutton('enable');
        $('#btnDelete').linkbutton('enable');

        $('#dgPower').datagrid('clearSelections');
        gPowers = [];
        arrayDel = [];
        arrayAdd = [];

        var request = {
            apiName: 'Manager/Power/List',
            moduleGuid: '',
            roleGuid: rowData.role_guid
        };
        api.post(request, function (request, response) {
            for (var index = 0; index < response.body.rows.length; index++) {
                gPowers.push(response.body.rows[index].power_guid);
            }
        }, null, null, null, false);
    };

    //设置新增默认值
    var showAdd = function () {
        $('#state').combobox('setValue', 1);
        $('#enum_code_role_type').combobox('setValue', 'RT:Plat');
        $('#role_order').numberbox('setValue', 0);
        $('#dgPower').datagrid('clearSelections');
        $('#role_id').val('');
        $('#role_guid').val('');
        gPowers = [];
        arrayDel = [];
        arrayAdd = [];
    };

    $('#treeS').tree({
        url: managerRoot + 'ApiProxy?apiName=Manager/Role/ListTree',
        onLoadSuccess: function () {
            $('#tipS').html('');
            $('#btnCancel').linkbutton('enable');
            $('#btnAdd').linkbutton('enable');
            $('#btnUpdate').linkbutton('disable');
            $('#btnDelete').linkbutton('disable');
        },
        onClick: function (node) {
            row = node.attributes;
            if (row == null) return;
            showUpdate(row);
        },
        closable: false
    });

    $('#dlgLeft').dialog({
        width: 200,
        height: document.documentElement.clientHeight - 10,
        left: 5,
        top: 5,
        closed: false,
        modal: false,
        closable: false
    });
    $('#dlgRight').dialog({
        width: document.body.clientWidth - 200,
        height: document.documentElement.clientHeight - 10,
        left: 210,
        top: 5,
        closed: false,
        closable: false,
        modal: false,
        buttons: [
         { id: 'btnAdd', text: 'Create', iconCls: 'icon-add' },
         { id: 'btnUpdate', text: 'Modify', iconCls: 'icon-edit' },
         { id: 'btnDelete', text: 'Delete', iconCls: 'icon-remove' },
         { id: 'btnCancel', text: 'Reset', iconCls: 'icon-cancel' }]
    });

    $('#dlgModule').dialog({
        width: 200,
        height: document.documentElement.clientHeight - 180,
        left: 226,
        top: 118,
        closed: false,
        modal: false,
        closable: false
    });
    $('#treeModule').tree({
        url: managerRoot + 'ApiProxy?apiName=Manager/Module/ListTree',
        onLoadSuccess: function () {

        },
        onClick: function (node) {
            showModulePower(node.id, '');
        }
    });

    //表格初始化
    $('#dgPower').datagrid({
        width: document.body.clientWidth - 450,
        height: document.documentElement.clientHeight - 180,
        columns: [[
            { field: 'chk', title: 'Select', width: 50, checkbox: true },
            { field: 'power_name', title: 'Permission Name', width: 150, align: 'center' },
            { field: 'power_desc', title: 'Permission Desc', width: 180, align: 'center' },
            {
                field: 'power_validate', title: 'Validation Required', width: 130, align: 'center',
                formatter: function (value, rowData, rowIndex) {
                    return value == 1 ? 'Yes' : 'No';
                }
            },
            {
                field: 'state', title: 'Permission State', width: 130, align: 'center',
                formatter: function (value, rowData, rowIndex) {
                    return value == 1 ? 'Enabled' : 'Disabled';
                }
            }
        ]],
        onLoadSuccess: function (data) {
            var len = data.rows.length;
            for (var index = 0; index < len; index++) {
                if ($.inArray(data.rows[index].power_guid, gPowers) >= 0) {
                    $('#dgPower').datagrid('selectRow', index);
                }
            }
        },
        onSelect: function (rowIndex, rowData) {
            if ($.inArray(rowData.power_guid, gPowers) < 0) {
                gPowers.push(rowData.power_guid);
            }
            if ($.inArray(rowData.power_guid, arrayAdd) < 0) {
                arrayAdd.push(rowData.power_guid);
            }
            var index = $.inArray(rowData.power_guid, arrayDel);
            if (index >= 0) {
                arrayDel.splice(index, 1);
            }
        },
        onUnselect: function (rowIndex, rowData) {
            var index = $.inArray(rowData.power_guid, gPowers);
            if (index >= 0) {
                gPowers.splice(index, 1);
            }
            index = $.inArray(rowData.power_guid, arrayAdd);
            if (index >= 0) {
                arrayAdd.splice(index, 1);
            }
            if ($.inArray(rowData.power_guid, arrayDel) < 0) {
                arrayDel.push(rowData.power_guid);
            }
        },
        onSelectAll: function (rows) {
            var num = rows.length;
            var rowData = null;
            var index = -1;
            for (var i = 0; i < num; i++) {
                rowData = rows[i];
                if ($.inArray(rowData.power_guid, gPowers) < 0) {
                    gPowers.push(rowData.power_guid);
                }
                if ($.inArray(rowData.power_guid, arrayAdd) < 0) {
                    arrayAdd.push(rowData.power_guid);
                }
                index = $.inArray(rowData.power_guid, arrayDel);
                if (index >= 0) {
                    arrayDel.splice(index, 1);
                }
            }
        },
        onUnselectAll: function (rows) {
            var num = rows.length;
            var rowData = null;
            var index = -1;
            for (var i = 0; i < num; i++) {
                rowData = rows[i];
                index = $.inArray(rowData.power_guid, gPowers);
                if (index >= 0) {
                    gPowers.splice(index, 1);
                }
                index = $.inArray(rowData.power_guid, arrayAdd);
                if (index >= 0) {
                    arrayAdd.splice(index, 1);
                }
                if ($.inArray(rowData.power_guid, arrayDel) < 0) {
                    arrayDel.push(rowData.power_guid);
                }
            }
        },
        onDblClickRow: function (rowIndex, rowData) {

        },
        onAfterEdit: function (rowIndex, rowData, changes) {

        },
        pagination: false
    });

    //删除
    $('#btnDelete').click(function () {
        if ($('#btnDelete').linkbutton('options').disabled) {
            return;
        }
        if (null == row) {
            parent.show({ msg: 'Please select roles to delete!' });
            return;
        }
        confirm('Are you sure to delete [' + row.role_name + ']?', function (isYes) {
            if (!isYes) {
                return;
            }
            var request = {
                apiName: 'Manager/Role/Delete',
                idList: [row.role_id]
            };
            api.post(request, function (request, response) {
                if (response.result != 'OK') return;
                $('#treeS').tree('reload');
                $('#btnCancel').click();
            });
        });
    });

    //修改
    $('#btnUpdate').click(function () {
        if ($('#btnUpdate').linkbutton('options').disabled) {
            return;
        }
        $('#formSave').submit();
    });

    //新增
    $('#btnAdd').click(function () {
        if ($('#btnAdd').linkbutton('options').disabled) {
            return;
        }
        $('#formSave').submit();
    });

    $('#btnCancel').click(function () {
        $('#formSave').form('reset');
        showAdd();

        $('#btnCancel').linkbutton('enable');
        $('#btnAdd').linkbutton('enable');
        $('#btnUpdate').linkbutton('disable');
        $('#btnDelete').linkbutton('disable');
    });

    //表单初始化
    $('#formSave').form({
        onSubmit: function () {
            if ($('#formSave').form('validate')) {
                var request = $('#formSave').toJSON();
                request['apiName'] = 'Manager/Role/' + (request.role_id ? 'Update' : 'Create');
                request.grantingPowerGuidList = arrayAdd;
                request.revokingPowerGuidList = arrayDel;
                api.post(request, function (request, response) {
                    if (response.result != 'OK') return;
                    $('#treeS').tree('reload');
                    $('#btnCancel').click();
                });
            }
            return false;

        }
    });

    showAdd();
});